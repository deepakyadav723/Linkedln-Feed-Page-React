import React from "react";

import { user } from "../../../../data";
import userReader from "../../readers/user.reader";

import "./user.css";

const User = () => {
  const name = userReader.name(user) ?? "Username";
  const profilePic = userReader.profilePic(user) ?? "Profile Pic";
  const highlights = userReader.highlights(user) ?? "User Highlights";
  const location = userReader.location(user) ?? "User Location";
  const backgroundImage =
    userReader.backgroundImage(user) ?? "User Background Image";

  return (
    <div className="currentLogInUser">
      <div className="userBackgroundImgDiv">
        <img
          id="userBackgroundImg"
          src={backgroundImage}
          alt="User-Background-Image"
        />
      </div>
      <div className="userInfo">
        <img id="userImg" src={profilePic} alt="User-Profile-Picture" />
        <h4 id="userName">{name}</h4>
        <p id="userHighlights">{highlights}</p>
        <span id="userLocation">{location}</span>
      </div>
    </div>
  );
};

export default User;
