// Inside Reels.js
import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import ReelModal from './ReelModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReelsAction, getUserReelsAction } from '../../Redux/Reel/reel.action';
import Sidebar from '../Sidebar/Sidebar';

const Reels = ({ userId, withSidebar = true }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedReel, setSelectedReel] = useState(null);
  const dispatch = useDispatch();
  const reel = useSelector((store) => store.reel);

  const handlePaperClick = (clickedReel) => {
    setSelectedReel(clickedReel);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserReelsAction(userId));
    } else {
      dispatch(getAllReelsAction());
    }
  }, [dispatch, userId]);

  return (
    <>
      {withSidebar && <Sidebar />}
      <div style={{ marginLeft: withSidebar ? "250px" : "0", padding: "50px" }}>
        <div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {reel.reels.map((item) => (
              <Paper key={item.id} onClick={() => handlePaperClick(item)} style={{ margin: "10px" }}>
                <video controls style={{ height: "300px", minWidth: "150px", backgroundColor: "lightgrey", margin: "10px", maxWidth: "170px" }}>
                  <source src={item.videourl} type="video/mp4" />
                </video>
              </Paper>
            ))}
          </div>
          <ReelModal open={isModalOpen} handleClose={handleCloseModal} selectedReel={selectedReel} />
        </div>
      </div>
    </>
  );
};

export default Reels;
