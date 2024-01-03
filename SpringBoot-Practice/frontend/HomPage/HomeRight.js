import React from "react";
import SearchUser from "../SearchUser/SearchUser";
import PopularUserCard from "../SearchUser/PopularUserCard";
import { Button, Card, Divider, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import Chat from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Notifications from "@mui/icons-material/Notifications";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Auth/auth.action";

const users = [1, 34, 2, 24, 3];
const HomeRight = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store);
  const dispatch = useDispatch();
  

  const handleLogout = ()=>{
    localStorage.removeItem("jwt");
    dispatch(logout());
    navigate("/");
    console.log("Logout success")
  };
  const getCurrentUser = () => {
    const userJson = localStorage.getItem("currentUser");
    return userJson ? JSON.parse(userJson) : {};
  };

  return (
    <>
      <Card
        style={{
          backgroundColor: "#26678A",
          padding: "18px",
          justifyContent: "flex-end",
          marginBottom: "40px",
          width: "25%",
          textAlign: "end",
          position: "fixed",
        }}
      >
        <IconButton>
          <Notifications style={{ color: "white" }} />
        </IconButton>
        <span>
          <IconButton>
            <Chat style={{ color: "white" }} />
          </IconButton>
        </span>
        <IconButton onClick={handleLogout}>
          <PowerSettingsNew style={{ color: "white" }} />
        </IconButton>
      </Card>
      <Card
        style={{
          height: "auto",
          width: "60%",
          padding: "10px",
          marginTop: "110px",
          boxShadow: "2px 2px 3px grey",
        }}
      >
        <SearchUser />
        <div
          className="flex justify-between py-5 items-center"
          style={{ borderBottom: "2px solid #26678A", marginBottom: "5px" }}
        >
          <p className="font-semibold opacity-70">Suggestions</p>
          <p className="text-xs">View all</p>
        </div>

        <div
          className="space-y-3"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {users.map((item, index) => (
            <PopularUserCard key={index} items={item} />
          ))}
        </div>
      </Card>
    </>
  );
};

export default HomeRight;
