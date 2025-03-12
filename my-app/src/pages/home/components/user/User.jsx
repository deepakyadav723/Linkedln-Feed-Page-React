import React from "react";

import userBackgroundImg from "../../assets/background.png";
import profilePic from "../../assets/profile-pic.png";

import "./user.css";

const User = () => {
  return (
    <div className="currentLogInUser">
      <div className="userBackgroundImgDiv">
        <img
          id="userBackgroundImg"
          src={userBackgroundImg}
          alt="User-Background-Image"
        />
      </div>
      <div className="userInfo">
        <img id="userImg" src={profilePic} alt="User-Profile-Picture" />
        <h4 id="userName">Deepak Yadav</h4>
        <p id="userHighlights">
          ASE Intern @Tekion || NITRR CSE'25 || Guardian (Leetcode: 2148) ||
          Specialist (Codeforces- Rating: 1426)
        </p>
        <span id="userLocation">Firozabad, Uttar Pradesh</span>
      </div>
    </div>
  );
};

export default User;
