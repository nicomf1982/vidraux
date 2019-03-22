import React from "react";
import { fabric } from "fabric";

class Canvas extends React.Component {
  componentDidMount = () => {
    this.canvas = new fabric.Canvas("drawing-canvas");    
    this.canvas.backgroundColor = "rgb(0,0,0,0)";
    this.canvas.isDrawingMode = 1;
    this.canvas.freeDrawingBrush.color = "purple";
    this.canvas.freeDrawingBrush.width = 10;
    this.canvas.renderAll();
  }

  saveCanvas = () => {
    let link = document.createElement("a");
    link.href = this.canvas.toDataURL({ format: "png" });
    link.download = "canvas.png";
    link.click();
  };

  render = () => {
    return (
      <div className="drawing-canvas-container">
        <canvas id="drawing-canvas" height="360" width="640"/>
      </div>
    );
  }
}

export default Canvas;
