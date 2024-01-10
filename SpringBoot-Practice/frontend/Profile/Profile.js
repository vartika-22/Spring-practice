import React from "react";
import { Avatar, Box, Card} from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import Button from "@mui/material/Button";
import ProfileTabs from "./ProfileTabs";
import { useSelector } from "react-redux";

const Profile = () => {
  const { auth } = useSelector((store) => store);
  return (
    <div >
      <Sidebar/>
      <Box style={{marginLeft:"400px",padding:"10px"}}>
        <Card
          className="w-[80%]"
          style={{ backgroundColor: "#F5FBFB", height: "auto" }}
        >
          <div>
            <div>
              <img src="https://wallpapercave.com/wp/UI82ILn.jpg" alt="cover" />
            </div>
            <div className='"px-5 flex flex-row justify-between items-start mt-5 h-[5rem]'>
              <Avatar
                // src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                sx={{ width: "10rem", height: "10rem", marginTop: "-100px",border:"4px solid white" ,marginLeft:"10px",backgroundColor: "#26678A",fontSize:"50px"}}
              >{auth.user.firstName.charAt(0).toUpperCase()+auth.user.lastName.charAt(0).toUpperCase()}</Avatar>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  float: "end",
                  alignItems: "end",
                }}
              >
                {true ? (
                  <Button
                    variant="outlined"
                    style={{ color: "#26678A", borderColor: "#26678A",marginRight:"50px" }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button variant="outlined" style={{ color: "#26678A", borderColor: "#26678A",marginRight:"50px" }}>follow</Button>
                )}
              </div>
            </div>
            <div style={{ textAlign:"left" ,marginLeft:"60px"}}>
              <h1 style={{fontSize:"25px"}}><b>{auth.user.firstName+" "+auth.user.lastName}</b></h1>
              <small>
                <p style={{fontSize:"15px",opacity:"75%"}}>{auth.user.email}</p>
              </small>
            </div>
            <div style={{marginTop:"10px",textAlign:"left",marginLeft:"50px"}}>
                <Button style={{ color: "#26678A"}}>{} Posts</Button>
                <span><Button style={{ color: "#26678A"}}>{auth.user.followings?.length || 0}Following</Button></span>
                <Button style={{ color: "#26678A"}}>{auth.user.followers?.length || 0} Follower</Button>
              </div>
          </div>
          <div>
            <section>
              <ProfileTabs/>
            </section>
          </div>
        </Card>
      </Box>
    </div>
  );
};

export default Profile;
