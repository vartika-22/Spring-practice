import {
  Box,
  Button,
  Modal,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { uploadToCloudnary } from "../../utils/uploadToCloudnary";
import Image from "@mui/icons-material/Image";
import { createStoryAction } from "../../Redux/Story/story.action";
import { useDispatch } from "react-redux";

export const SelectStory = ({ open, onClose }) => {
  const [isloading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const dispatch=useDispatch();
  const handleSelectImage = async (event) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudnary(event.target.files[0], "image");
    setSelectedImage(imageUrl);
    setIsLoading(false);
  };
  const  handleStoryPost=async(e)=>{
    e.preventDefault();
    if (!selectedImage) {
        return;
      }
      const storyData = {
        image: selectedImage,
        caption: caption,
      };
      dispatch(createStoryAction(storyData));
      console.log("Stroy sent",storyData)
    onClose();
    
  }
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          width: "300px",
          height: "550px",
        }}
      >
        <form onSubmit={handleStoryPost}>
          <div>
            <Button style={{marginTop:"-50px" }}>
              <label htmlFor="image-story">
                <Image style={{ color: "#26678A"}} />
              </label>
              <input
                type="file"
                id="image-story"
                accept="image/*"
                onChange={handleSelectImage}
                style={{ padding: "2px", border: "none", display: "none" }}
              />
            </Button>
            <TextareaAutosize
              placeholder="Enter caption..."
              name="caption"
              id="caption"
              cols={20}
              style={{
                padding: "10px",
                margin: "5px",
                width: "60%",
                border: "2px solid #26678A",
                borderRadius: "10px",
              }}
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
            />
        {selectedImage && (
          <div>
            <img
              src={selectedImage}
              alt="images"
              style={{ height: "490px", width: "300px" }}
            />
            <Button type="submit" style={{marginTop:"-50px",backgroundColor:"white",zIndex:2,float:"right"}}>Add Story</Button>
          </div>
        )}
        </div>
        </form>
      </Box>
    </Modal>
  );
};
