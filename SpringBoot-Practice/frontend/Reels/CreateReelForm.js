import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Avatar, Backdrop, Button, CircularProgress, Paper, TextareaAutosize } from "@mui/material";
import Add from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloudnary } from "../../utils/uploadToCloudnary";

const CreateReelForm = () => {
  const [isloading, setIsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [title,setTitle]=useState("");
  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloudnary(event.target.files[0], "video");
    setSelectedVideo(videoUrl);
    setIsLoading(false);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <Sidebar></Sidebar>

      <div style={{ marginLeft: "250px", padding: "50px" }}>
        <div>
          <div style={{ display: "flex", flexWrap: "wrap" ,backgroundColor:"lightblue"}}>
            <Paper
              style={{
                height: "400px",
                minWidth: "270px",
                backgroundColor: "lightgrey",
                margin: "10px",
                alignItems: "center",
                alignContent: "center",
                display: "flex",
                justifyContent: "center",
                position: "relative", // Added position relative
              }}
            >
              {selectedVideo ? (
                <>
                  <video
                    controls
                    style={{
                      height: "400px",
                      minWidth: "270px",
                      maxWidth: "270px",
                      backgroundColor: "lightgrey",
                      pointerEvents: "none", // Added pointer-events none
                    }}
                  >
                    <source src={selectedVideo} type="video/mp4" />
                  </video>
                  <CloseIcon
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      cursor: "pointer",
                    }}
                    onClick={handleCloseVideo}
                  />
                </>
              ) : (
                <>
                  <Avatar>
                    <input
                      type="file"
                      id="video-input"
                      accept="video/*"
                      onChange={handleSelectVideo}
                      style={{
                        padding: "2px",
                        border: "none",
                        display: "none",
                      }}
                    />
                    <label htmlFor="video-input">
                      <Add style={{ color: "#26678A" }} />
                    </label>
                  </Avatar>
                </>
              )}
            </Paper>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isloading}
              // onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <div style={{marginTop:"50px",display:"flex"}}>
            <TextareaAutosize
                  placeholder="Enter caption..."
                  name="title"
                  id="title"
                  cols={30}
                  style={{
                    padding: "15px",
                    margin: "10px",
                    width: "100%",
                    border: "2px solid #26678A",
                    borderRadius: "10px",
                    minHeight:"200px",
                    maxHeight:"200px",
                    overflowY:"auto"
                  }}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
            <Button>Post</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateReelForm;
