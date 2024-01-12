import api, { API_BASE_URL } from "../../Components/Config/api";
import {
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
} from "./follow.actionType";

export const followUserAction = (jwt, userId) => async (dispatch) => {
  dispatch({ type: FOLLOW_USER_REQUEST });
  try {
    const { data } = await api.put(
      `${API_BASE_URL}/api/users/follow/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FOLLOW_USER_FAILURE, payload: error });
  }
};
