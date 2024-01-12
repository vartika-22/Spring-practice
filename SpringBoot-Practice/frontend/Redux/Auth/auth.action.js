import axios from "axios";
import { GET_ALL_USERS_FAILURE, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType";
import api, { API_BASE_URL } from "../../Components/Config/api";

export const loginUserAction=(loginData)=>async(dispatch)=>{
   
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data}=await axios.post(`${API_BASE_URL}/auth/signin`,loginData.data);
        if(data.token){
            localStorage.setItem("jwt",data.token)
        }
        console.log("login Sucessfully",data)
        dispatch({type:LOGIN_SUCCESS,payload: { token: data.token, user:{email:data.email} }})
        
    } catch (error) {
        console.log("------------------",error)
        dispatch({type:LOGIN_FAILURE,payload:error})   
    }
}
export const registerUserAction=(loginData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data}=await axios.post(`${API_BASE_URL}/auth/signup`,loginData.data);
        if(data.token){
            localStorage.setItem("jwt",data.token)
        }
        console.log("registered Sucessfully",data)
        dispatch({type:LOGIN_SUCCESS,payload:data})

    } catch (error) {
        console.log("------------------",error)
        dispatch({type:LOGIN_FAILURE,payload:error})   
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  };

  export const loginSuccess = (payload) => {
    console.log('Login Success Action:', payload);
    return {
      type: LOGIN_SUCCESS,
      payload,
    };
  };

  
  export const getProfileAction=(jwt)=>async(dispatch)=>{
    dispatch({type:GET_PROFILE_REQUEST})
    try {
        const {data}=await axios.get(`${API_BASE_URL}/api/users/profile`,
        {
            headers:{
            "Authorization":`Bearer ${jwt}`
        },
    });
        console.log("Profile",data)
        dispatch({type:GET_PROFILE_SUCCESS,payload:data})
    } catch (error) {
        console.log("------------------",error)
        dispatch({type:GET_PROFILE_FAILURE,payload:error})   
    }
}

export const updateProfileAction=(reqData,id)=>async(dispatch)=>{
    dispatch({type:UPDATE_PROFILE_REQUEST})
    try {
        const {data}=await api.put(`${API_BASE_URL}/api/users/${id}`,reqData
      );
        console.log("Profile updated-- ",data)
        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data})
    } catch (error) {
        console.log("------------------",error)
        dispatch({type:UPDATE_PROFILE_FAILURE,payload:error})   
    }
}

export const getAllUsersAction=()=>async(dispatch)=>{
    dispatch({type: GET_ALL_USERS_REQUEST});
    try{
        const {data}=await api.get(`${API_BASE_URL}/api/users`);
        dispatch({type:GET_ALL_USERS_SUCCESS,payload:data});
        console.log("Allusers :",data)
    } catch (error) {
    dispatch({ type: GET_ALL_USERS_FAILURE, payload: error });
}
}