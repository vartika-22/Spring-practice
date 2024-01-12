// comment.reducer.js

import {
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAILURE,
  } from './Comment.actionType';
  
  const initialState = {
    comments: [],
    newComment:null,
    loading: false,
    error: null,
  };
  
  const commentReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_COMMENT_REQUEST:
        return {
          ...state,
          comments:[action.payload,...state.comments],
          loading: true,
          error: null,
        };
      case CREATE_COMMENT_SUCCESS:
        return {
          ...state,
          newComment:action.payload,
          comments: [...state.comments, action.payload],
          loading: false,
          error: null,
        };
      case CREATE_COMMENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default commentReducer;
  