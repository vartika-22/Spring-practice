import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    CardHeader,
    Divider
  } from "@mui/material";
import { useDispatch } from "react-redux";
import { followUserAction } from "../../Redux/Follow/follow.action";

const PopularUserCard = ({items}) => {
  const jwt=localStorage.getItem("jwt")
  const dispatch=useDispatch();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const followedUsers = JSON.parse(localStorage.getItem("followedUsers")) || [];
    setIsFollowing(followedUsers.includes(items.id));
  }, [items.id]);

  const handleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      const followedUsers = JSON.parse(localStorage.getItem("followedUsers")) || [];
      localStorage.setItem(
        "followedUsers",
        JSON.stringify(followedUsers.filter((id) => id !== items.id))
      );
    } else {
      setIsFollowing(true);
      const followedUsers = JSON.parse(localStorage.getItem("followedUsers")) || [];
      localStorage.setItem("followedUsers", JSON.stringify([...followedUsers, items.id]));
      dispatch(followUserAction(jwt, items.id));
    }
  };

  return (
    <div>
      <CardHeader
        style={{ display: "flex", textAlign:"left", margin: "-5px" }}
        avatar={
          <Avatar style={{ backgroundColor: "#26678A",fontSize:"13px"}} aria-label="recipe">
            {items.firstName.charAt(0).toUpperCase()+items.lastName.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <Button variant="contained" style={{fontSize:"10px",backgroundColor:"#26678A",color:"white"}} onClick={handleFollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        }
        title={items.firstName+" "+items.lastName}
        subheader={"@"+items.firstName+"_"+items.lastName}
      /><Divider/>
    </div>
  );
};

export default PopularUserCard;
