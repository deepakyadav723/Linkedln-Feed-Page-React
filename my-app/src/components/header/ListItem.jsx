import React from "react";

const defaultProfilePic = require("../../assets/Default_pfp.jpg");

const ListItem = ({ name, profilePic, ...props }) => {
  return (
    <li {...props}>
      <img
        className="searchedUserImg"
        src={profilePic === "" ? defaultProfilePic : profilePic}
        alt="Profile Pic"
      />
      <span id="userFound">{name}</span>
    </li>
  );
};

export default ListItem;
