import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import AddIcCall from "@mui/icons-material/AddIcCall";
import Duo from "@mui/icons-material/Duo";
import Send from "@mui/icons-material/Send";
import Chat from "@mui/icons-material/Chat";
import { ChatCard } from "./ChatCard";
import SearchUser from "../SearchUser/SearchUser";
import { ChatMessage } from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createChat, createMessage, getAllChats } from "../../Redux/Message/Message.action";

const userss = [1, 3, 4, 52, 4, 2, 4, 5, 3, 2];

const Message = () => {
  const { message, auth } = useSelector((store) => store);
  const [messageContent, setMessageContent] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  // const [messages,setMessages]=useState();
  console.log("messages: ",message.chats)
const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  const handleCreateMessage = (value) => {
    value.preventDefault();
    
    const newMessage = {
      id: selectedChat ? selectedChat.id : null,
      content: messageContent,
      image: null,
    };
    dispatch(createMessage(newMessage))
    setMessageContent("");
    
  };

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setMessageContent(chat.message);
  };

  return (
    <div>
      <Sidebar />
      <Box style={{ marginLeft: "270px", padding: "10px" }}>
        <Grid container spacing={1} style={{position:"fixed"}}>
          <Grid item xs={2}>
            <Card
              style={{ padding: 23, background: "#26678A", color: "white" }}
            >
              <p>Chats</p>
            </Card>
            <Card>
              <div>
                <h2 style={{ margin: "20px" }}>
                  <SearchUser />
                </h2>
              </div>
              <Divider />
              <div
                style={{
                  minHeight: "430px",
                  overflowY: "auto",
                  maxHeight: "430px",
                }}
              >
                {message.chats.map((chat) => (
                  <ChatCard
                    key={chat.id}
                    chat={chat}
                    onClick={() => handleChatClick(chat)}
                  />
                ))}
              </div>
            </Card>
          </Grid>
          <Grid item xs={7}>
            {selectedChat ? (
              <>
                <Paper
                  style={{
                    padding: 16,
                    background: "lightblue",
                    display: "flex",
                    fontSize: "20px",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={
                      auth.user.id === selectedChat.user[0].id
                        ? `${selectedChat.user[1].imageUrl}`
                        : `${selectedChat.user[0].imageUrl}`
                    }
                    style={{ marginRight: "10px" }}
                  />
                  <p>{
          auth.user.id === selectedChat.user[0].id
            ? `${selectedChat.user[1].firstName} ${selectedChat.user[1].lastName}`
            : `${selectedChat.user[0].firstName} ${selectedChat.user[0].lastName}`
        }</p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "auto",
                    }}
                  >
                    <IconButton>
                      <AddIcCall style={{ marginRight: "10px" }} />
                    </IconButton>
                    <IconButton>
                      <Duo />
                    </IconButton>
                  </div>
                </Paper>
                <Card
                  style={{
                    width: "100%",
                    minHeight: "75%",
                    marginTop: "5px",
                    maxHeight: "75%",
                    overflowY: "auto",
                    padding: "20px",
                  }}
                >
                  {message.chats.map((item)=><ChatMessage key={item.id} item={item} />)}
                </Card>

                <form onSubmit={handleCreateMessage}>
                  <div
                    style={{
                      bottom: 0,
                      width: "100%",
                      height: "70px",
                      padding: "5px",
                      textAlign: "center",
                      display: "flex",
                      backgroundColor: "#DCF2F1",
                    }}
                  >
                    <TextField
                      placeholder="Enter message..."
                      name="message"
                      id="message"
                      style={{ color: "#26678A", width: "90%" }}
                      onChange={(e) => setMessageContent(e.target.value)}
                      value={messageContent}
                    />
                    <IconButton>
                      <Send
                        style={{ margin: "10px", color: "#26678A" }}
                      />
                    </IconButton>
                  </div>
                </form>
              </>
            ) : (
              <div style={{marginTop:"25%",marginLeft:"25%",fontSize:"40px"}}><Chat style={{width:"40%",height:"40%",color:"lightblue"}}/><p><b>No chat</b></p></div>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Message;
