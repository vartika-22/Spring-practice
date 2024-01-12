import api from "../../Components/Config/api";
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS } from "./Comment.actionType";

export const createCommentAction = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_COMMENT_REQUEST});
    try {
      console.log("posting comment: ",reqData);
      const response  = await api.post(`http://localhost:9090/api/comments/post/${reqData.postid}`, reqData.data);
      dispatch({ type: CREATE_COMMENT_SUCCESS, payload:response.data});
      console.log("comment posted ", response.data);
    } catch (error) {
      console.log("Error: ", error);
      dispatch({ type: CREATE_COMMENT_FAILURE, payload: error });
    }
  };