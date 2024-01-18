import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    CardHeader,
    Divider
  } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { followUserAction } from "../../Redux/Follow/follow.action";

const PopularUserCard = ({items}) => {
  const jwt=localStorage.getItem("jwt")
  const dispatch=useDispatch();
  const auth = useSelector((store) => store.auth);
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    const followedUsers = JSON.parse(localStorage.getItem("followedUsers")) || [];
    setIsFollowing(followedUsers.includes(items.id));
  }, [items.id]);

  const handleFollow = (userId) => {
    console.log("Before state update - userId:", userId);
  setIsFollowing(!isFollowing);
  console.log("After state update - userId:", userId);
    const followedUsers = JSON.parse(localStorage.getItem("followedUsers")) || [];
    const updatedFollowedUsers = isFollowing
      ? followedUsers.filter(id => id !== userId)
      : [...followedUsers,userId];
    
      if (userId) {
        dispatch(followUserAction(jwt, userId));
      } else {
        console.error("userId is undefined");
      }
    localStorage.setItem("followedUsers", JSON.stringify(updatedFollowedUsers));

    window.location.reload()

    // Update local state based on the updated list
    if (auth.user && auth.user.userid !== items.id) {
      dispatch(followUserAction(jwt, auth.user.userid));
    }
   
  };

  return (
    <div>
      <CardHeader
        style={{ display: "flex", textAlign:"left", margin: "-5px" }}
        avatar={
          <Avatar style={{ backgroundColor: "#26678A",fontSize:"13px"}} aria-label="recipe" src={items.imageUrl}>
            {items.firstName.charAt(0).toUpperCase()+items.lastName.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <Button variant="contained" style={{fontSize:"10px",backgroundColor:"#26678A",color:"white"}} onClick={() => handleFollow(items.id)}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        }
        title={items.firstName+" "+items.lastName}
        subheader={"@"+items.firstName+"_"+items.lastName}
      />
      <Divider/>
    </div>
  );
};

export default PopularUserCard;
