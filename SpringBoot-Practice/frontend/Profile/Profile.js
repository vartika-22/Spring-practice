import React, { useState } from "react";
import { Avatar, Box, Card } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import Button from "@mui/material/Button";
import ProfileTabs from "./ProfileTabs";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import Edit from "@mui/icons-material/Edit";
import { FollowerModal } from "./FollowerModal";
import { FollowingModal } from "./FollowingModal";

const Profile = () => {
  const auth  = useSelector((store) => store.auth);
  const post = useSelector((store) => store.post);
  const reel=useSelector(store=>store.reel)
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isFollowerOpen,setFollowerOpen]=useState(false);
  const [isFollowingOpen,setFollowingOpen]=useState(false);
  const handleEditProfileOpen = () => {
    setEditProfileOpen(true);
  };
  const handleEditProfileClose = () => {
    setEditProfileOpen(false);
  };
  const handleFollowerOpen=()=>{
    setFollowerOpen(true);
  }
  const handleFollowerClose=()=>{
    setFollowerOpen(false);
  }
  const handleFollowingOpen=()=>{
    setFollowingOpen(true);
  }
  const handleFollowingClose=()=>{
    setFollowingOpen(false);
  }

  return (
    <div>
      <Sidebar />
      <Box style={{ marginLeft: "300px", padding: "10px" }}>
        <Card
          className="w-[90%]"
          style={{ backgroundColor: "#F5FBFB", height: "auto" }}
        >
          <div>
            <div>
              <img
                src={auth.user.coverImageUrl}
                alt="cover"
                style={{ height: "300px" }}
                className="w-full"
              />
            </div>
            
            <div className='"px-5 flex flex-row justify-between items-start mt-5 h-[5rem]'>
              <Avatar
                src={auth.user?.imageUrl}
                sx={{
                  width: "10rem",
                  height: "10rem",
                  marginTop: "-100px",
                  border: "4px solid white",
                  marginLeft: "10px",
                  backgroundColor: "#26678A",
                  fontSize: "50px",
                }}
              >
                {auth.user?.firstName?.toUpperCase()?.charAt(0) +
                  auth.user?.lastName?.toUpperCase().charAt(0)}
              </Avatar>
            </div>
            <Avatar
              style={{
                marginLeft: "130px",
                marginTop: "-70px",
                marginBottom: "50px",
                zIndex: 1,
                backgroundColor: "#26678A",
                border: "4px solid white",
              }}
            >
              <Edit
                style={{ color: "white", borderColor: "#26678A" }}
                onClick={handleEditProfileOpen}
              >
                Edit Profile
              </Edit>
              <EditProfile
                open={isEditProfileOpen}
                handleClose={handleEditProfileClose}
              />
            </Avatar>

            <div
              style={{
                marginTop: "-100px",
                textAlign: "right",
                marginRight: "10%",
                marginBottom: "50px",
              }}
            >
              <Button style={{ color: "#26678A", marginLeft: "35px" }}>
              {post.usersPosts.length+reel.reels.length} Posts
              </Button>
              
              <span>
                <Button style={{ color: "#26678A", marginLeft: "35px" }} onClick={handleFollowingOpen} >
                  {auth.user.followings?.followings?.length } Following
                </Button>
                <FollowingModal open={isFollowingOpen}
                handleClose={handleFollowingClose} followings={auth.user.followings}/>
                
              </span>
              <Button style={{ color: "#26678A", marginLeft: "35px" }} onClick={handleFollowerOpen}>
                {auth.user.followers?.followers?.length || 0} Follower
              </Button>
              <FollowerModal open={isFollowerOpen}
                handleClose={handleFollowerClose} followers={auth.user.followers}/>
            </div>
            <div style={{ textAlign: "left", marginLeft: "60px",marginTop:"-15px" }}>
              <h1 style={{ fontSize: "25px" }}>
                <b>{auth.user.firstName + " " + auth.user.lastName}</b>
              </h1>
              <small>
                <p style={{ fontSize: "15px", opacity: "75%" }}>
                  {auth.user.email}
                </p>
              </small>
            </div>
          </div>
          <div>
            <section>
              <ProfileTabs />
            </section>
          </div>
        </Card>
      </Box>
    </div>
  );
};

export default Profile;
