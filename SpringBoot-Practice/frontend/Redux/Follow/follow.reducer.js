// auth.reducer.js

import {
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAILURE,
    // other action types...
  } from "./follow.actionType";
  
  const initialState = {
    // other state properties...
    followUserLoading: false,
    followUserError: null,
  };
  
  export const followReducer = (state = initialState, action) => {
    switch (action.type) {
      case FOLLOW_USER_REQUEST:
        return { ...state, followUserLoading: true, followUserError: null };
      case FOLLOW_USER_SUCCESS:
        // Handle the success state, update your user or other relevant state.
        return {
          ...state,
          user: { ...state.user, /* update user properties if needed */ },
          followUserLoading: false,
        };
      case FOLLOW_USER_FAILURE:
        return { ...state, followUserLoading: false, followUserError: action.payload };
      default:
        return state;
    }
  };
  