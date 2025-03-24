import React from "react";
import _map from "lodash/map";
import { NavLink } from "react-router-dom";

import { headerComponentInfo } from "../../data";
import profilePic from "../../assets/profile-pic.png";
import downArrow from "../../assets/down-arrow.png";

const Navbar = () => {
  return (
    <>
      {_map(headerComponentInfo, (item) => (
        <NavLink key={item.title} to={item.href} className="navLinks">
          <div className="rightIconsDiv">
            <img
              className="rightIcons"
              src={item.iconImg}
              alt={`${item.title} icon`}
            />
          </div>
          <div className="rightDivsIconName">{item.title}</div>
        </NavLink>
      ))}

      <div className="currentUser">
        <div className="profilePicDiv">
          <img className="profilePic" src={profilePic} alt="Profile Pic" />
        </div>
        <div className="me">
          Me
          <img className="downArrow" src={downArrow} alt="Down arrow" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
