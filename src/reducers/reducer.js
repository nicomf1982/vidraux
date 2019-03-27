const reducer = (state = { frames: {}, recording: 0 }, action) => {
  switch (action.type) {
    case "PLAYER_READY": {
      return { ...state, player: action.payload };
    }
    case "NEW_CANVAS": {
      return { ...state, canvas: action.payload };
    }
    case "DRAWING_STATE": {
      state.canvas.isDrawingMode = action.payload;
      return { ...state };
    }
    case "RECORDING_STATE": {
      return { ...state, recording: action.payload };
    }
    case "NEW_FRAME": {
      state.frames[action.payload.time] = action.payload.data;
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
