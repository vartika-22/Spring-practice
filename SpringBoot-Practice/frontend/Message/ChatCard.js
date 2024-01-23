import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChats } from "../../Redux/Message/Message.action";

export const ChatCard = ({chat,onClick}) => {
  const {message,auth} = useSelector((store)=>store);
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(getAllChats());
}, [dispatch]);
if (!chat || !chat.user || chat.user.length === 0) {
  return null; // or handle this case in a way that makes sense for your application
}

// console.log("Chat" ,chat)
  return (
    <div>
      <Card
        style={{
          fontSize:"10px" ,
          margin: "5px",
          display: "flex",
          fontSize: "15px",
          alignItems: "center",
        }}
        onClick={onClick}
      >
        <CardHeader avatar={<Avatar
          src={
            auth.user.id === chat.user[0].id
              ? `${chat.user[1].imageUrl}`
              : `${chat.user[0].imageUrl}`
          }
          style={{ width: "35px", height: "35px", marginRight: "5px"}}
        />} 
        title={
          auth.user.id === chat.user[0].id
            ? `${chat.user[1].firstName} ${chat.user[1].lastName}`
            : `${chat.user[0].firstName} ${chat.user[0].lastName}`
        }
        subheader={"message"}
        >
          
        </CardHeader>
        
      </Card>
    </div>
  );
};
