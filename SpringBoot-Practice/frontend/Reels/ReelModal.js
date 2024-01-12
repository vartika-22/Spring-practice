// ReelPopupModal.js
import React from "react";
import { Box, Modal, Backdrop, CircularProgress, Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const ReelModal = ({ open, handleClose, selectedReel }) => {
  const auth = useSelector((store) => store.auth);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          height: "550px",
        }}
      >
        {selectedReel && (
          <div>
            <video
              controls
              style={{
                height: "550px",
                minWidth: "310px",
                backgroundColor: "lightgrey",
                maxWidth: "310px",
              }}
            >
              <source src={selectedReel.videourl} type="video/mp4" />
            </video>
            <div
              style={{
                display: "flex",
                marginTop: "-150px",
                marginLeft: "20px",
              }}
            >
              <Avatar src={selectedReel.user.imageUrl} />
              <p
                style={{
                  marginLeft: "10px",
                  marginTop: "10px",
                  color: "white",
                  fontFamily: "Monospace",
                }}
              >
                <b>{selectedReel.user.firstName + " " + selectedReel.user.lastName}</b>
              </p>
            </div>
            <p
              style={{
                marginLeft: "25px",
                marginTop: "5px",
                color: "white",
                fontSize: "10px",
                width: "230px",
                maxHeight:"30px",
                overflowY: "auto",
              }}
            >
              {selectedReel.title}
            </p>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default ReelModal;
