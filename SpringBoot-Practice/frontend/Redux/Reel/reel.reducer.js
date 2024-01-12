import {
    GET_ALL_REELS_REQUEST,
    GET_ALL_REELS_SUCCESS,
    GET_ALL_REELS_FAILURE,
    LIKE_REEL_REQUEST,
    LIKE_REEL_SUCCESS,
    LIKE_REEL_FAILURE,
    GET_USER_REELS_REQUEST,
    GET_USER_REELS_SUCCESS,
    GET_USER_REELS_FAILURE,
    CREATE_REEL_REQUEST,
    CREATE_REEL_SUCCESS,
    CREATE_REEL_FAILURE,
  } from './reel.actionType';
  
  const initialState = {
    reels: [],
    loading: false,
    error: null,
  };
  
  const reelReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_REELS_REQUEST:
      case LIKE_REEL_REQUEST:
      case GET_USER_REELS_REQUEST:
      case CREATE_REEL_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case GET_ALL_REELS_SUCCESS:
      case GET_USER_REELS_SUCCESS:
        return {
          ...state,
          reels: action.payload,
          loading: false,
          error: null,
        };
  
      case LIKE_REEL_SUCCESS:
      case CREATE_REEL_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
        };
  
      case GET_ALL_REELS_FAILURE:
      case LIKE_REEL_FAILURE:
      case GET_USER_REELS_FAILURE:
      case CREATE_REEL_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default reelReducer;
  