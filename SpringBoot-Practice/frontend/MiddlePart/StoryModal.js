import { Avatar, Box, Button, Dialog, DialogContent, LinearProgress, Modal, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react"

const StoryModal = ({ open, onClose,storyImage, imageUrl, userName,caption }) => {
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(()=>{
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100||paused) {
          return oldProgress;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
    const autoCloseTimer=setInterval(()=>{
      onClose();
      clearInterval(timer);
    },10000)

    return () => {
      clearInterval(timer);
      clearTimeout(autoCloseTimer);

    };
  }, []);
    
    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          height: "550px",
          width:"350px"
        }}>
          
          <div style={{marginBottom:"-60px",display:"flex",marginLeft:"20px",zIndex:2}}>
          <Avatar sx={{ width: "40px", height: "40px" }} src={imageUrl} />
          <p style={{ zIndex: 2,marginLeft:"10px",color:"white" ,marginTop:"5px"}}>{userName}</p>
          </div>
          <Paper>
          <LinearProgress variant="determinate" value={progress} />
            <img src={storyImage} style={{width:"100%",height:"570px"}}/>
            <Button style={{backgroundColor:"white",marginTop:"-100px",color:"black",float:"right",marginRight:"20px"}}>{caption}</Button>
          </Paper>
        </Box>
      </Modal>
    );
  };

  export default StoryModal;
  