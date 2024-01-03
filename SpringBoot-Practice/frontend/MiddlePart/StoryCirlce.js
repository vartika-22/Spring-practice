import { Avatar } from "@mui/material";
import React from "react";

const StoryCirlce = () => {
  return (
    <div style={{paddingRight:"30px"}} >
      <div className="py-3 flex flex-col items-ceter rounded-b-md">
        <Avatar
          sx={{ width: "25px", height: "25px" }}
          src="https://1.bp.blogspot.com/-72y4WoOLmR0/XlRUm2OG7AI/AAAAAAAAmfA/okWPZNrYJVI4goO1RZ1xMPAr9YseWDV2ACLcBGAsYHQ/s2560/cute-white-cat-1080x1920.jpg"
          className="flex flex-col items-center mr-4 cursor-pointer"
        />
        <p>
          <small style={{ opacity: "60px",color:"white" ,marginLeft:"-10px"}}>username</small>
        </p>
      </div>
    </div>
  );
};

export default StoryCirlce;
