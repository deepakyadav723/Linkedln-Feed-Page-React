import React, { useCallback, useState } from "react";

import { useWindowListener } from "../../../../hooks/hooks.general";
import downArrow from "../../assets/down-arrow.png";
import upArrow from "../../assets/arrow-up.png";
import { user } from "../../../../data";

import "./profileInfo.css";

const ProfileInfo = () => {
  const [profileInfoDisplay, setProfileInfoDisplay] = useState(true);
  const [showMoreDisplay, setShowMoreDisplay] = useState(false);
  const [showLessDisplay, setShowLessDisplay] = useState(false);

  const handleWindowResize = useCallback(function handleWindowResize() {
    const mediaQuery = window.matchMedia("(min-width: 769px)");
    setProfileInfoDisplay(mediaQuery.matches);
    setShowMoreDisplay(!mediaQuery.matches);
    setShowLessDisplay(false);
  }, []);

  useWindowListener("resize", handleWindowResize);

  const handleDisplayButton = useCallback((show) => {
    setProfileInfoDisplay(show);
    setShowMoreDisplay(!show);
    setShowLessDisplay(show);
  }, []);

  const { profileViewers, postImpression } = user;

  return (
    <>
      {profileInfoDisplay && (
        <div className="profileInfo">
          <div className="profileViewers profileInfoSections">
            <span className="viewersText">Profile viewers</span>
            <span className="viewersCount">{profileViewers}</span>
          </div>
          <div className="postImpressions profileInfoSections">
            <span className="impressionText">Post impressions</span>
            <span className="impressionCount">{postImpression}</span>
          </div>
        </div>
      )}
      {showMoreDisplay && (
        <button className="showMore" onClick={() => handleDisplayButton(true)}>
          Show More{" "}
          <img className="showMoreIcon" src={downArrow} alt="Down arrow" />
        </button>
      )}
      {showLessDisplay && (
        <button className="showLess" onClick={() => handleDisplayButton(false)}>
          Show Less{" "}
          <img className="showLessIcon" src={upArrow} alt="Up arrow" />
        </button>
      )}
    </>
  );
};

export default ProfileInfo;
