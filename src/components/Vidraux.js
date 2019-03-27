import React from "react";
import Canvas from "./Canvas";
import Video from "./Video";

class Vidraux extends React.Component {
  render() {
    return (
      <div>
        <Video />
        <Canvas />
      </div>
    );
  }
}

export default Vidraux;
