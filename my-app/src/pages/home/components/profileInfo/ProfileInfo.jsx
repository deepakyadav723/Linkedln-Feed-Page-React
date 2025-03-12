import React, { useCallback, useState } from "react";
import cx from "classnames";

import { useWindowListener } from "../../helper/home.general";
import downArrow from "../../assets/down-arrow.png";
import upArrow from "../../assets/arrow-up.png";

import "./profileInfo.css";

const ProfileInfo = () => {
  const [profileInfoDisplay, setProfileInfoDisplay] = useState(true);
  const [showMoreDisplay, setShowMoreDisplay] = useState(false);
  const [showLessDisplay, setShowLessDisplay] = useState(false);

  const handleWindowResize = useCallback(function handleWindowResize() {
    const mediaQuery = window.matchMedia("(min-width: 769px)");
    if (mediaQuery.matches) {
      setProfileInfoDisplay(true);
      setShowMoreDisplay(false);
      setShowLessDisplay(false);
    } else {
      setProfileInfoDisplay(false);
      setShowMoreDisplay(true);
      setShowLessDisplay(false);
    }
  }, []);
  useWindowListener("resize", handleWindowResize);

  function handleShowMoreButton() {
    setProfileInfoDisplay(true);
    setShowMoreDisplay(false);
    setShowLessDisplay(true);
  }

  function handleShowLessButton() {
    setProfileInfoDisplay(false);
    setShowMoreDisplay(true);
    setShowLessDisplay(false);
  }

  return (
    <>
      <div className={cx("profileInfo", { displayNone: !profileInfoDisplay })}>
        <div className="profileViewers profileInfoSections">
          <span className="viewersText">Profile viewers</span>
          <span className="viewersCount">45</span>
        </div>
        <div className="postImpressions profileInfoSections">
          <span className="impressionText">Post impressions</span>
          <span className="impressionCount">11</span>
        </div>
      </div>
      <button
        className={cx("showMore", { displayNone: !showMoreDisplay })}
        onClick={handleShowMoreButton}
      >
        Show More{" "}
        <img className="showMoreIcon" src={downArrow} alt="Down arrow" />
      </button>
      <button
        className={cx("showLess", { displayNone: !showLessDisplay })}
        onClick={handleShowLessButton}
      >
        Show Less <img className="showLessIcon" src={upArrow} alt="Up arrow" />
      </button>
    </>
  );
};

export default ProfileInfo;
