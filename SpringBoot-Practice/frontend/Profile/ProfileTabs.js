// Inside ProfileTabs.js
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { Card } from "@mui/material";
import PostCard from "../Posts/PostCard";
import UserReelsCard from "../Reels/UserReelsCard";
import { useDispatch, useSelector } from "react-redux";
import { getUsersPostAction } from "../../Redux/Post/post.action";
import Reels from "../Reels/Reels";

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved-Post" },
];

const savedPost = [1, 2, 2, 4, 4];

const ProfileTabs = () => {
  const [value, setValue] = useState("post");
  const auth = useSelector((store) => store.auth);
  const post = useSelector((store) => store.post);
  const reel=useSelector(store=>store.reel)
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === "post") {
      dispatch(getUsersPostAction(auth.user.id));
    }
  }, [dispatch, value, auth.user.id]);

  return (
    <div style={{ marginLeft: "-10px" }}>
      <Box
        sx={{
          width: "100%",
          marginLeft: "50px",
          borderBottom: 2,
          borderColor: "divider",
        }}
      >
        <div
          style={{
            backgroundColor: "#26678A",
            height: "2px",
            marginLeft: "-40px",
            marginTop: "20px",
          }}
        ></div>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="#26678A"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          {tabs.map((item) => (
            <Tab
              key={item.value}
              value={item.value}
              label={item.name}
              wrapped
              style={{ marginRight: "230px", fontSize: "15px" }}
            />
          ))}
        </Tabs>
      </Box>
      <div className="flex justify-center">
        <div >
          {value === "post" ? (
            <div style={{ marginTop: "15px" }}>
              {post.usersPosts.map((item) => (
                  <div>
                    <PostCard item={item} createdAt={item.createdAt}/>
                  </div>
                ))}
            </div>
          ) : value === "reels" ? (
            <div style={{marginLeft:"-60px",marginTop:"-40px"}}>
                <Reels userId={auth.user.id} withSidebar={false} />
            </div>
          ) : value === "saved" && (
            <div className="flex-wrap justify-center gap-2 my-10">
              {savedPost.map((item) => (
                <PostCard key={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;
