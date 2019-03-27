const reducer = (state = { canvasState: 1, frames: [] }, action) => {
  switch (action.type) {
    case "PLAYER_READY": {
      return { ...state, player: action.payload };
    }
    case "NEW_CANVAS": {
      return { ...state, canvas: action.payload };
    }
    case "CHANGE_CANVAS_STATE": {
      let newCanvasState = state.canvasState === 0 ? 1 : 0;
      return { ...state, canvasState: newCanvasState };
    }
    case "NEW_FRAME": {
      return { ...state, frames: [...state.frames, action.payload] };
    }
    default:
      return state;
  }
};

export default reducer;
