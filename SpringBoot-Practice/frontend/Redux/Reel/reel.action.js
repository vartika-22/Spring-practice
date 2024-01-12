import axios from "axios";
import api from "../../Components/Config/api";
import {
  CREATE_REEL_FAILURE,
  CREATE_REEL_REQUEST,
  CREATE_REEL_SUCCESS,
  GET_ALL_REELS_FAILURE,
  GET_ALL_REELS_REQUEST,
  GET_ALL_REELS_SUCCESS,
  GET_USER_REELS_FAILURE,
  GET_USER_REELS_REQUEST,
  GET_USER_REELS_SUCCESS,
  LIKE_REEL_FAILURE,
  LIKE_REEL_REQUEST,
  LIKE_REEL_SUCCESS
} from "./reel.actionType";

export const createReelAction = (reelData, jwt) => async (dispatch) => {
  dispatch({ type: CREATE_REEL_REQUEST });
  try {
    console.log("posting reel data: ", reelData);
    const response = await api.post(`/api/reels`, reelData, {
      headers: { Authorization: jwt }
    });
    console.log('Api response: ', response.data)
    dispatch({ type: CREATE_REEL_SUCCESS, payload: response.data });
    console.log("created reel ", response.data);
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: CREATE_REEL_FAILURE, payload: error });
  }
};

export const getAllReelsAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_REELS_REQUEST });
  try {
    const { data } = await api.get(`/api/reels`);
    dispatch({ type: GET_ALL_REELS_SUCCESS, payload: data });
    console.log("get all reels ", data);
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: GET_ALL_REELS_FAILURE, payload: error });
  }
};

export const getUserReelsAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_REELS_REQUEST });
  try {
    const { data } = await api.get(`/api/reels/user/${userId}`);
    dispatch({ type: GET_USER_REELS_SUCCESS, payload: data });
    console.log("get user's reels ", data);
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: GET_USER_REELS_FAILURE, payload: error });
  }
};

export const likeReelAction = (reelId) => async (dispatch) => {
  dispatch({ type: LIKE_REEL_REQUEST });
  try {
    const { data } = await api.put(`/api/reels/like/${reelId}`);
    dispatch({ type: LIKE_REEL_SUCCESS, payload: data });
    console.log("liked reel ", data);
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: LIKE_REEL_FAILURE, payload: error });
  }
};
