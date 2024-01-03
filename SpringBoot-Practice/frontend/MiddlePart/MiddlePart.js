import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Add from "@mui/icons-material/Add";
import { Button, Card, IconButton, TextField, Tooltip } from "@mui/material";
import Image from "@mui/icons-material/Image";
import SmartDisplay from "@mui/icons-material/SmartDisplay";
import FeaturedPlayList from "@mui/icons-material/FeaturedPlayList";
import PostCard from "../Posts/PostCard";
import CreatePostModel from "../CreatePost/CreatePostModel";
import StoryCircle from "./StoryCirlce";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction } from "../../Redux/Post/post.action";

const story = [11, 2, 4, 3, 5, 8, 9, 6, 4, 7];

const MiddlePart = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((store) => store);
  const [OpenCreatePostModal, setOpenCreatePostModal] = useState(false);
  const handleCloseCreatePostModal = () => {
    setOpenCreatePostModal(false);
    console.log("close post modal ...");
  };
  const handleOpenCreatePostModal = () => {
    setOpenCreatePostModal(true);
    console.log("open post modal ...");
  };
  useEffect(() => {
    dispatch(getAllPostAction());
  }, []);

  const getCurrentUser = () => {
    const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : {};
  };
  const user=getCurrentUser();
  

  return (
    <div className="px-8 ">
      <Card
        className="flex"
        style={{
          backgroundColor: "#26678A",
          position: "fixed",
          marginLeft: "-40px",
          maxWidth: "620px",
          overflowX: "auto",
          border: "none",
          height: "90px",
          zIndex: 2,
        }}
      >
        <div
          className="py-3 flex flex-col items-ceter rounded-b-md"
          style={{
            paddingLeft: "30px",
            paddingRight: "20px",
            marginRight: "30px",
            borderRight: "1px solid white",
          }}
        >
          <Avatar
            sx={{ width: "25px", height: "25px" }}
            className="flex flex-col items-center mr-2 cursor-pointer"
          >
            <Add sx={{ fontSize: "20px" }} />
          </Avatar>
          <p>
            <small
              style={{ opacity: "60px", color: "white", marginLeft: "-10px" }}
            >
              Add
            </small>
          </p>
        </div>
        {story.map((items, index) => (
          <StoryCircle key={index} />
        ))}
      </Card>

      <Card
        style={{
          padding: "10px",
          margin: "10px",
          marginTop: "100px",
          marginLeft: "-25px",
        }}
      >
        <div className="flex justify-betewen">
          <Avatar style={{ margin: "10px", backgroundColor: "#26678A" }} />
          <input
            id="outlined-basic"
            placeholder=" Create a new post"
            style={{
              width: "80%",
              marginLeft: "20px",
              color: "#D19963",
              border: "1.5px solid #26678A",
              borderRadius: "10px",
            }}
            onClick={handleOpenCreatePostModal}
          />
        </div>
        <div className="flex" style={{ marginLeft: "70px" }}>
          <div>
            <Tooltip title="Media">
              <IconButton onClick={handleOpenCreatePostModal}>
                <Image style={{ color: "#26678A" }} />
              </IconButton>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Video">
              <IconButton onClick={handleOpenCreatePostModal}>
                <SmartDisplay style={{ color: "#26678A" }} />
              </IconButton>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Article">
              <IconButton onClick={handleOpenCreatePostModal}>
                <FeaturedPlayList style={{ color: "#26678A" }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Card>
      <div style={{ width: "570px", backgroundColor: "#E5F0F1" }}>
        {post.posts.map((item) => {
          return <PostCard key={item.postid} item={item} />;
        })}
      </div>
      <div>
        <CreatePostModel
          handleClose={handleCloseCreatePostModal}
          open={OpenCreatePostModal} currentUser={user}
        />
      </div>
    </div>
  );
};

export default MiddlePart;
