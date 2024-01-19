import api from "../../Components/Config/api";
import { CREATE_CHAT_FAILURE, CREATE_CHAT_REQUEST, CREATE_CHAT_SUCCESS, CREATE_MESSAGE_FAILURE, CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_SUCCESS, GET_ALL_CHATS_FAILURE, GET_ALL_CHATS_REQUEST, GET_ALL_CHATS_SUCCESS } from "./Message.actionType";

export const createMessage = (message) => (dispatch) => {
   dispatch({type:CREATE_MESSAGE_REQUEST})
    try{
        const {data} =  api.post(`/api/message`,message);
        console.log("created message: ",data)
        dispatch({type:CREATE_MESSAGE_SUCCESS,payload:data})
    }catch(error){
        console.log("Error: ",error)
        dispatch({type:CREATE_MESSAGE_FAILURE,payload:error})
    }
};

export const createChat = (chat) => (dispatch) => {
    dispatch({type:CREATE_CHAT_REQUEST})
     try{
         const {data} = api.post(`/api/chats`,chat);
         console.log("created chat: ",data)
         dispatch({type:CREATE_CHAT_SUCCESS,payload:data})
     }catch(error){
         console.log("Error: ",error)
         dispatch({type:CREATE_CHAT_FAILURE,payload:error})
     }
 };

 export const getAllChats = () => (dispatch) => {
    dispatch({type:GET_ALL_CHATS_REQUEST})
     try{
         const {data} = api.get(`/api/chats`);
         console.log("get all chats: ",data)
         dispatch({type:GET_ALL_CHATS_SUCCESS,payload:data})
     }catch(error){
         console.log("Error: ",error)
         dispatch({type:GET_ALL_CHATS_FAILURE,payload:error})
     }
 };
