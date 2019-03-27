import React from "react";
import { fabric } from "fabric";
import store from "../store";

const RECORDING = 1;
const PLAYBACK = 2;

class Canvas extends React.Component {
  componentDidMount = () => {
    //create canvas and store it
    let canvas = new fabric.Canvas("drawing-canvas");
    canvas.isDrawingMode = 0;
    canvas.freeDrawingBrush.color = "purple";
    canvas.freeDrawingBrush.width = 10;
    canvas.renderAll();
    store.dispatch({ type: "NEW_CANVAS", payload: canvas });

    //register timer (1s interval)
    setTimeout(this.onTick, 1000);
  };

  onTick = () => {
    // re-register timer (1s interval)
    setTimeout(this.onTick, 1000);
    // check for player
    if (!store.getState().player) {
      return;
    }
    // record or playback canvas
    switch (store.getState().recording) {
      case RECORDING: {
        this.saveCanvasOnCurrentTime();
        break;
      }
      case PLAYBACK: {
        this.loadCanvasOnCurrentTime();
        break;
      }
      default: {
      }
    }
  };

  saveCanvasOnCurrentTime = () => {
    // build current frame
    let frame = {
      time: Math.floor(store.getState().player.getCurrentTime()),
      data: store.getState().canvas.toJSON()
    };
    // store current frame
    store.dispatch({ type: "NEW_FRAME", payload: frame });
  };

  loadCanvasOnCurrentTime = () => {
    // get frame based on current time
    let atThisTime = Math.floor(store.getState().player.getCurrentTime());
    let frame = store.getState().frames[atThisTime];
    let canvas = store.getState().canvas;
    if (frame) {
      // load frame
      canvas.loadFromJSON(frame);
    } else {
      canvas.clear();
    }
  };

  freehand = () => {
    store.dispatch({ type: "DRAWING_STATE", payload: 1 });
  };

  selection = () => {
    store.dispatch({ type: "DRAWING_STATE", payload: 0 });
  };

  nothing = () => {
    store.dispatch({ type: "RECORDING_STATE", payload: 0 });
  };

  record = () => {
    store.dispatch({ type: "RECORDING_STATE", payload: RECORDING });
  };

  play = () => {
    store.dispatch({ type: "RECORDING_STATE", payload: PLAYBACK });
  };

  render = () => {
    return (
      <div className="drawing-canvas-container">
        <canvas id="drawing-canvas" height="300" width="640" />
        <nav>
          Dwaring:
          <button type="button" onClick={this.freehand}>
            START
          </button>
          <button type="button" onClick={this.selection}>
            STOP
          </button>
          Play mode
          <button type="button" onClick={this.record}>
            RECORD
          </button>
          <button type="button" onClick={this.play}>
            PLAYBACK
          </button>
          <button type="button" onClick={this.nothing}>
            NOTHING
          </button>
        </nav>
      </div>
    );
  };
}

export default Canvas;
