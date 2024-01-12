import axios from "axios";
import api from "../../Components/Config/api";
import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  GET_ALL_POST_FAILURE,
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_USERS_POST_FAILURE,
  GET_USERS_POST_REQUEST,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS
} from "./post.actionType";

export const createPostAction = (postData) => async (dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });
  try {
    console.log("posting data: ",postData);
    const response  = await api.post(`http://localhost:9090/api/posts`, postData);
    console.log('Api responce: ',response.data)
    dispatch({ type: CREATE_POST_SUCCESS, payload:response.data});
    console.log("created post ", response.data);
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: CREATE_POST_FAILURE, payload: error });
  }
};

export const getAllPostAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_POST_REQUEST });
  try {
    const { data } = await api.get('/api/posts');
    dispatch({ type: GET_ALL_POST_SUCCESS, payload: data });
    console.log("get all post ", data);
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: GET_ALL_POST_FAILURE, payload: error });
  }
};

export const getUsersPostAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_USERS_POST_REQUEST });
  try {
    const { data } = await api.get(`/api/posts/user/${userId}`);
    dispatch({ type: GET_USERS_POST_SUCCESS, payload: data });
    console.log("get users post ", data);
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: GET_USERS_POST_FAILURE, payload: error });
  }
};

export const likePostAction = (postId) => async (dispatch,getState) => {
  dispatch({ type: LIKE_POST_REQUEST });
  try {
    const { data } = await api.put(`/api/posts/like/${postId}`);
    dispatch({ type: LIKE_POST_SUCCESS, payload: data });
    console.log("liked post ", data);
  } catch (error) {
    console.log("Error: ", error);
    dispatch({ type: LIKE_POST_FAILURE, payload: error });
  }
};

