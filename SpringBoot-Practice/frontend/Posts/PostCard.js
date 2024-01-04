import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import CardMedia from "@mui/material/CardMedia";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import Share from "@mui/icons-material/Share";
import Bookmarks from "@mui/icons-material/Bookmarks";
import Favorite from "@mui/icons-material/Favorite";
import BookmarksOutlined from "@mui/icons-material/BookmarksOutlined";
import { createCommentAction } from "../../Redux/Comment/Comment.action";
import { useDispatch, useSelector } from "react-redux";
import { likePostAction } from "../../Redux/Post/post.action";
import { isLikedByReqUser } from "../../utils/isLikendByReqUser";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #26678A",
  boxShadow: 24,
  padding: "50px",
  borderRadius: "10px",
};

const PostCard = ({item,createdAt}) => {
  
  const [showComments, setShowComments] = useState(false);
  const dispatch=useDispatch();
  const auth = useSelector(state => state.auth);
  const handleShowComment = () => {
    setShowComments(!showComments);
  };
 
  const handleCreateComment = (content) => {
    if (!item) {
      console.error("Post details (item) not available.");
      return;
    }
    const reqData={
      postid:item.postid,
      data:{
        content
      },
    }
    console.log("reqData",reqData);
    dispatch(createCommentAction(reqData))
    console.log("Comment submitted:", content);
  };

  const handleLikedPost=()=>{
    const isLiked = isLikedByReqUser(item.user.userid, item);
    
    dispatch(likePostAction(item.postid));
    
  }
  
  const formatPostTime = (createdAt) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(createdAt).toLocaleDateString(undefined, options);
  };
  return (
    <Card style={{ textAlign: "left",marginBottom:"20px",marginLeft:"-30px"}}>
      <CardHeader
        style={{ display: "flex", alignItems: "center", margin: "-5px" }}
        avatar={
          <Avatar style={{ backgroundColor: "#26678A" }} aria-label="recipe">
            {item.user.firstName.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={item.user.firstName+" "+item.user.lastName}
        subheader={"@"+item.user.firstName.toLowerCase()+"_"+item.user.lastName.toLowerCase()}
      />
      <Divider />
      <CardContent style={{ textAlign: "left", marginRight: "40px" }}>
        <Typography
          color="text.secondary"
          style={{ fontSize: "10px", justifyItems: "left", display: "flex" }}
        >
          {item.caption}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        image={item.imageUrl}
        alt="image"
        style={{ height: "400px" }}
      />
      
          <Typography variant="body1" color="textSecondary" style={{fontSize:"10px",marginLeft:"20px",marginTop:"5px",marginBottom:"5px"}}>
            {formatPostTime(createdAt)} {/* Add a function to format time */}
          </Typography><Divider/>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <IconButton onClick={handleLikedPost}>
           {!isLikedByReqUser(auth.userid,item) ?  (<FavoriteBorderOutlined />):(<Favorite style={{color:"red"}}/>)}
          </IconButton>
          <IconButton onClick={handleShowComment}>
            <ChatBubbleOutline />
          </IconButton >
          <IconButton>
            {<Share />}
          </IconButton>
        </div>
        <IconButton>
          {true?<Bookmarks />:<BookmarksOutlined/>}
        </IconButton>
      </CardActions>
        
       { showComments &&<section>
          <div className="flex items-center space-x-5 mx-3 p-2">
            <Avatar sx={{height:"25px",width:"25px"}} />
            <input onKeyPress={(e)=>{
              if(e.key==="Enter"){
                handleCreateComment(e.target.value,item.id)
                console.log("enter pressed--",e.target.value)
              }
            }} type="text" className="w-full outline-none bg-transparent border rounded-full px-2 py-2" placeholder="Write a comment"/>

          </div>
          <Divider/>
          <div className="mx-3 sapce-y-2 my-5 text-xs">
            
            <div style={{marginLeft:"20px"}}>
            {item.comments.map((comment,index)=>
            <div key={index}>
              <div className="flex items-center space-x-5">
              <Avatar sx={{height:"2rem",width:"2rem",fontSize:".rem"}}>
                {comment.user.firstName.charAt(0)}
              </Avatar><p><b>{comment.user.firstName+" "+comment.user.lastName}</b></p>
              <span style={{ marginLeft: "10px", color: "gray",fontSize:"8px",justifyContent:"flex-end",display:"flex" }}>
                  {formatPostTime(comment.createdat)} {/* Display comment timing */}
                </span>

            </div>
            <p style={{marginLeft:"50px"}}>{comment.content}</p>
            </div>

            )}
            </div>
          </div>
        </section>}

    </Card>
  );
};

export default PostCard;
