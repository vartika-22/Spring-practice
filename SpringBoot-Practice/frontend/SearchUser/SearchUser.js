import React, { useEffect, useState } from "react";
import Search from "@mui/icons-material/Search";
import { Avatar, Card, CardHeader, ListItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../Redux/Auth/auth.action";

const SearchUser = () => {
  const [userName, setUserName] = useState();
  const { message } = useSelector((store) => store);
  const { auth } = useSelector((store) => store);
  console.log("SearchUser...", auth);
  const dispatch = useDispatch();

  const handleSearchUser = (e) => {
    setUserName(e.target.value);
    dispatch(searchUserAction(userName));
    // console.log("SearchUser...",userName);
  };
  const handleClick = (id) => {
    console.log(id);
  };
  return (
    <div>
      <div>
        <input
          onChange={handleSearchUser}
          type="text"
          placeholder=" Search-User..."
          style={{
            width: "100%",
            border: "2px solid lightGrey",
            borderRadius: "10px",
            padding: "5px",
          }}
        />
        {userName &&
          auth.searchUser.map((item) =>
            <Card
              key={item.id}
              style={{
                zIndex: 2,
                position: "absolute",
                width: "225px",
                marginLeft: "-15px",
              }}
            >
              <CardHeader
                onClick={() => {
                  handleClick();
                  setUserName("");
                }}
                avatar={<Avatar src={item.imageUrl} />}
                title={item.firstName+" "+item.lastName}
                subheader={item.firstName.toLowerCase()+"_"+item.lastName.toLowerCase()}
              />
            </Card>
          )}
      </div>
    </div>
  );
};

export default SearchUser;
