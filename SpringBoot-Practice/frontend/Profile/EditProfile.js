import React , { useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, Backdrop, CircularProgress, FormControlLabel, IconButton, Radio, RadioGroup} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { uploadToCloudnary } from '../../utils/uploadToCloudnary';
import Image from '@mui/icons-material/Image';
import { updateProfileAction } from '../../Redux/Auth/auth.action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: "#F5FBFB",
  border: "2px solid #26678A",
  boxShadow: 24,
  padding: "50px",
  borderRadius: "10px",
  p: 4,
  
};

const EditProfile=({ open, handleClose })=> {

  const auth = useSelector((store) => store.auth);
  const [gender,setGender]=useState(auth.user?.gender);
  const [isloading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(auth.user?.imageUrl);
  const [firstName,setFirstName]=useState(auth.user?.firstName);
  const [lastName,setLastName]=useState(auth.user?.lastName);
  const dispatch=useDispatch();
  const handleSelectImage = async (event) => {
    setIsLoading(true);
    const imageUrl = await uploadToCloudnary(event.target.files[0], "image");
    setSelectedImage(imageUrl);
    setIsLoading(false);
  };
  const handleChange=(event)=>{
    setGender(event.target.value);
  };
  const getCurrentUser = () => {
    const userJson = localStorage.getItem("currentUser");
    return userJson ? JSON.parse(userJson) : {};
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const user = getCurrentUser();
      const profileData = {
        imageUrl: selectedImage,
        firstName,
        lastName,
        gender,
      };
      dispatch(updateProfileAction(profileData,user.id))
      console.log("Data-: ",profileData)
      handleClose();
      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit profileData. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleProfileSubmit}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
              <Avatar style={{ width: "150px", height: "150px", fontSize: "40px" ,border: "3px solid white" ,backgroundColor:"#26678A",marginTop:"30px"}} src={selectedImage}>
               {auth.user?.firstName?.toUpperCase().charAt(0) + auth.user?.lastName?.toUpperCase().charAt(0)}
              </Avatar>
              <Avatar style={{marginTop:"-30px",marginLeft:"70px",backgroundColor:"#26678A",border: "2px solid white",marginBottom:"20px"}}>
                <label htmlFor="image-input">
                  <Image style={{ color: "white"}} />
                </label>
                <input
                  type="file"
                  id="image-input"
                  accept="image/*"
                  onChange={handleSelectImage}
                  style={{ padding: "2px", border: "none", display: "none" }}
                />
              </Avatar>
            </div>
            <div>
            <div style={{margin:"20px"}}>
                <label>FirstName : </label>
                <input onChange={(e)=> setFirstName(e.target.value)} value={firstName} style={{padding:"4px"}}/>
            </div>
            <div style={{margin:"20px"}}>
                <label>LastName : </label>
                <input  onChange={(e)=> setLastName(e.target.value)} value={lastName} style={{padding:"4px"}}/>
            </div>
            <div style={{margin:"20px"}}>
            <RadioGroup row aria-label="gender" name="gender"  onChange={handleChange}>
                <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                <FormControlLabel value="othes" control={<Radio/>} label="Other"/>
              </RadioGroup>
            </div>
            </div>
            <div style={{display:"flex",justifyContent:"right"}}>
                <Button type='submit'>Update</Button>
            </div>
          </form>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isloading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </div>
  );
}
export default EditProfile;
