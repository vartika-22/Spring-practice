import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { Card } from "@mui/material";
import PostCard from "../Posts/PostCard";
import UserReelsCard from "../Reels/UserReelsCard";
import { useSelector } from "react-redux";

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved-Post" },
  { value: "repost", name: "Repost" },
];

const reels = [1, 2, 6, 7];
const savedPost = [1, 2, 2, 4, 4];
const repost = [2, 3, 4, 5, 2];
export default function ProfileTabs() {
  const { id } = useParams();
  const [value, setValue] = React.useState("post");
  const posts= useSelector(state => state.post);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="#26678A"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          {tabs.map((items) => (
            <Tab
              value={items.id}
              label={items.title}
              wrapped
              style={{ marginRight: "20px", fontSize: "15px" }}
            />
          ))}
        </Tabs>
      </Box>
      <div className="flex justify-center">
        <div style={{ width: "70%", marginTop: "10px" }}>
          {value === "post" ? (
            <div>
              {posts.posts.map((item) => (
                <div>
                  <PostCard />
                </div>
              ))}
            </div>
          ) : value === "reels" ? (
            <div className="flex flex-wrap justify-center gap-2 my-10">
              {reels.map((items) => (
                <UserReelsCard />
              ))}
            </div>
          ) : value === "saved" ?
            <div className=" flex-wrap justify-center gap-2 my-10">
              {savedPost.map((items) =>
                <PostCard />
              )}
            </div>: value === "repost" ? 
            <div className="flex flex-wrap justify-center gap-2 my-10">
              {repost.map((items) => 
                <PostCard/>
              )}
            </div>:(""
          )}
        </div>
      </div>
    </div>
  );
}
