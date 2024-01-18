import { Avatar, Card, Divider, Modal } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../Redux/Auth/auth.action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #26678A",
  boxShadow: 24,
  padding: "20px",
  borderRadius: "10px",
};

export const FollowerModal = ({ open, handleClose, followers }) => {
  const auth = useSelector((store) => store.auth);
  const user = followers.followers;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Card sx={style}>
        <div>
          <div
            style={{
              fontSize: "30px",
              fontFamily: "cursive",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            <h1>Follower</h1>
            <Divider />
          </div>
          <input placeholder="Search user" style={{width:"100%",border:"2px solid lightGrey",borderRadius:"10px",padding:"5px"}}/>
        
          <div style={{minHeight:"200px",maxHeight:"200px",overflowY:"auto"}}>
          {user.map((userId) => {
            const userItem = auth.allUsers.find((user) => user.id === userId);

            if (userItem) {
              return (
                <Card key={userItem.id} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", padding: "10px", alignItems: "center" }}>
                    <Avatar src={userItem.imageUrl} style={{ marginRight: "10px" }} />
                    <p>{userItem.firstName + " " + userItem.lastName}</p>
                  </div>
                </Card>
              );
            }

            return null; // User not found in auth.allUsers
          })}
          </div>
        </div>
      </Card>
    </Modal>
  );
};
