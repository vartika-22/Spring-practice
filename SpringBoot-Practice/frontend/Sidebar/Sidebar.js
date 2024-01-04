import React from "react";
import { navigationMenu } from "./SidebarNavigation";
import Logo from "../Images/Logo.png";
import Menu from "@mui/material/Menu";
import { Avatar, Button, Card, Divider, MenuItem, colors } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowRight from "@mui/icons-material/ArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import Logout from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreVert from "@mui/icons-material/MoreVert";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const logoImage = {
  width: "100px",
  height: "auto",
  marginLeft: "90px",
  marginBottom: "10px",
};

const Sidebar = () => {
  const auth = useSelector(state => state.auth);
  console.log("Auth:",auth)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getCurrentUser = () => {
    const userJson = localStorage.getItem('currentUser');
    console.log(userJson); // Add this line to check the value
    return userJson ? JSON.parse(userJson) : {};
  };
  
  return (
    <Card className="card h-screen flex flex-col justify-between fixed ">
      <div className="space-y-8 pl-3">
        <div style={{ backgroundColor: "#C7E7F8", marginLeft: "-15px" }}>
          <span className="logo">
            <h1 style={{fontSize:"30px",color:"#26678A",fontFamily:"cursive",padding:"20px",textShadow:"2px 2px 3px white"}}><b>Share vibe</b></h1>
          </span>
          <Divider />
        </div>
        <div style={{ paddingLeft: "10px",marginRight:"25px"}}>
          {navigationMenu.map((item) => (
        <Link key={item.title} to={item.path} className="cursor-pointer">
            <div className="cursor-pointer" >
              <Button style={{margin:"5px",width:"100%",textAlign:"left",justifyContent:"flex-start"}} size="small" >{item.icon}
              <p className="text-l" style={{ color: "#26678A" ,marginLeft:"10px"}}>
                {item.title}
              </p></Button>
            </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Divider  />
        <div
          className="pl-5 flex item-center justify-between pt-5"
          style={{ marginBottom: "15px" }}
        >
          <div className="flex item-center space-x-6">
            <Avatar src="https://th.bing.com/th/id/OIP.NqY3rNMnx2NXYo3KJfg43gAAAA?rs=1&pid=ImgDetMain" />
            <div>
              <p className="font-bold">UserName</p>
              <p
                className="opacity-80"
                style={{ marginTop: "-10px" }}
              >
                <small>{auth.user.id}</small>
              </p>
            </div>
          </div>
          <Button
            style={{
              color: "#26678A",
              marginLeft:"20px",
              borderRadius: "10%",
              marginRight: "10px"
            
            }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVert />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              Logout{"  "}
              <span>
                <Logout style={{ marginLeft: "10px" }} />
              </span>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
