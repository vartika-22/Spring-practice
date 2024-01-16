import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStoriesAction } from "../../Redux/Story/story.action";
import StoryModal from "./StoryModal";

const StoryCircle = (story) => {
 
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStory,setSelectedStory]=useState(null);
  const handleOpenModal = (user,story) => {
    setSelectedUser(user);
    setSelectedStory(story);
    console.log("selected user",story);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setSelectedStory(null);
  };
  return (
    <div style={{ paddingRight: "30px" }}>
      
        <div  className="py-3 flex flex-col items-center rounded-b-md">
          <Avatar
            sx={{ width: "25px", height: "25px" }}
            src={story.story.user.imageUrl}
            className="flex flex-col items-center mr-4 cursor-pointer"
            onClick={() => handleOpenModal(story.story.user,story.story)}
          />
          <p>
            <small style={{ opacity: "60px", color: "white", marginLeft: "-10px" }}>{story.story.user.firstName}</small>
          </p>
        </div>
      
      {selectedUser && (
        <StoryModal
          open={!!selectedUser}
          onClose={handleCloseModal}
          storyImage={selectedStory.image}
          imageUrl={selectedUser.imageUrl}
          userName={`${selectedUser.firstName} ${selectedUser.lastName}`}
          caption={selectedStory.caption}
        />
      )}
      
    </div>
  );
};

export default StoryCircle;
