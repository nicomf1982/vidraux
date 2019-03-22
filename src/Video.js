import React from "react";

class Video extends React.Component {
  YouTubeIframeAPIReady = false;

  constructor(props){
    console.log("constructor");
    super(props);
    this.injectYoutubeIframeAPI();    
  }

  injectYoutubeIframeAPI = () => {
    var tag = document.createElement('script');
		tag.src = "http://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = this.createPlayer;
  }
  
  createPlayer = () => {
    this.YouTubeIframeAPIReady = true;
    console.log("CreatePlayer", this);
    this.player = new window.YT.Player("video-player", {
      height: "360",
      width: "640",
      videoId: "-1xif50QMr4",
      events: {
        'onReady': this.onPlayerReady,
        'onStateChange': this.onPlayerStateChange,
        'onError': this.onPlayerError
      }
    });
  }

  onPlayerReady = (event) => {
    console.log('Ready', event);
    event.target.playVideo();
  }

  onPlayerStateChange = (event) => {
    console.log('StateChange', event);
  }

  onPlayerError = (event) => {
    console.log("Error", event);
  }

  render = () => {
    return (  
        <div>
          <div className="video-container">
            <div id="video-player"></div>
          </div>
        </div>
    );
  }
}

export default Video;
