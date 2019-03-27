import React from "react";
import store from "../store";

const DEFAULT_PLAYER_CONFIG = {
  height: "360",
  width: "640",
  videoId: "y104cTXY3qY",
  controls: 0,
  rel: 0,
  enablejsapi: 1,
  events: []
};

class Video extends React.Component {
  YouTubeIframeAPIReady = false;

  constructor(props) {
    super(props);
    this.injectYoutubeIframeAPI();
  }

  injectYoutubeIframeAPI = () => {
    var tag = document.createElement("script");
    tag.src = "http://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = this.createPlayer;
  };

  createPlayer = () => {
    this.YouTubeIframeAPIReady = true;
    this.player = new window.YT.Player("video-player", {
      ...DEFAULT_PLAYER_CONFIG,
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange,
        onError: this.onPlayerError
      }
    });
    window.player = this.player;
  };

  onPlayerReady = event => {
    store.dispatch({ type: "PLAYER_READY", payload: this.player });
    event.target.playVideo();
  };

  onPlayerStateChange = event => {
    store.dispatch({ type: "PLAYER_STATE_CHANGE", state: event.data });
  };

  onPlayerError = event => {
    console.log("Error", event);
  };

  play = () => {
    this.player.playVideo();
  };

  pause = () => {
    this.player.pauseVideo();
  };

  stop = () => {
    this.player.stopVideo();
  };

  render = () => {
    return (
      <div>
        <button type="button" onClick={this.play}>
          PLAY
        </button>
        <button type="button" onClick={this.pause}>
          PAUSE
        </button>
        <button type="button" onClick={this.stop}>
          STOP
        </button>
        <div className="video-container">
          <div id="video-player" />
        </div>
      </div>
    );
  };
}

export default Video;
