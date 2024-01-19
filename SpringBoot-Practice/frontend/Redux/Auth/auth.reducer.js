import {
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SEARCH_USER_SUCCESS,
  UPDATE_FOLLOW_STATE,
} from "./auth.actionType";

const storedToken = localStorage.getItem("jwt");
const initialState = {
  token: storedToken,
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    followers: [],
    followings:[],
    imageUrl: null,
    gender: null,
    coverImageUrl:null
  },
  error: null,
  loading: false,
  allUsers: [],
  followedUsers: [],
  searchUser:[]
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        user: {
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          followers: action.payload,
          followings:action.payload,
          imageUrl: action.payload.imageUrl,
          gender: action.payload.gender,
          coverImageUrl:action.payload.coverImageUrl
        },
        error: null,
        loading: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      console.log("Reducer - Login Success:", action.payload);
      return {
        ...state,
        token: action.payload.token,
        user: {
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          imageUrl: action.payload.imageUrl,
          gender: action.payload.gender,
          coverImageUrl:action.payload.coverImageUrl
        },
        loading: false,
        error: null,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT_SUCCESS:
      return initialState;
    case GET_ALL_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsers: action.payload,
        error: null,
        loading: false,
      };
    case GET_ALL_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_FOLLOW_STATE:
      return {
        ...state,
        followedUsers: action.payload,
      };
    case SEARCH_USER_SUCCESS:
      return {...state,searchUser:action.payload,loading:false,error:null}
    default:
      return state;
  }
};
