import React from "react";
import { fabric } from "fabric";
import store from "../store";

class Canvas extends React.Component {
  state = 0;

  constructor(props) {
    super(props);
    this.frames = [];
  }
  componentDidMount = () => {
    this.canvas = new fabric.Canvas("drawing-canvas");
    this.canvas.isDrawingMode = 1;
    this.canvas.freeDrawingBrush.color = "purple";
    this.canvas.freeDrawingBrush.width = 10;
    this.canvas.renderAll();
    store.dispatch({ type: "NEW_CANVAS", payload: this.canvas });
    setTimeout(this.onTick, 1000);
  };

  onTick = () => {
    let player = store.getState().player;
    if (player) {
      if (store.getState().canvasState === 1) {
        this.saveCanvasOnCurrentTime();
      } else {
        this.loadCanvasOnCurrentTime();
      }
    }
    setTimeout(this.onTick, 1000);
  };

  saveCanvasOnCurrentTime = () => {
    let frame = {
      time: Math.floor(store.getState().player.getCurrentTime()),
      data: this.canvas.toJSON()
    };
    store.dispatch({ type: "NEW_FRAME", payload: frame });
  };

  loadCanvasOnCurrentTime = () => {
    let frame = store
      .getState()
      .frames.filter(
        f => f.time === Math.floor(store.getState().player.getCurrentTime())
      )[0];
    if (frame) {
      this.canvas.loadFromJSON(frame.data);
    }
  };

  change = () => {
    store.dispatch({ type: "CHANGE_CANVAS_STATE" });
  };

  render = () => {
    return (
      <div className="drawing-canvas-container">
        <canvas id="drawing-canvas" height="300" width="640" />
        <button type="button" onClick={this.change}>
          CHANGE
        </button>
      </div>
    );
  };
}

export default Canvas;
