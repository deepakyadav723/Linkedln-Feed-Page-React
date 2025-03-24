import React from "react";
import { useSelector } from "react-redux";

import homeSelector from "../../../../reducers/home.selector";
// import { HomeContext } from "../../store/homeContext/Context";

import "./newPostNotification.css";

const NewPostNotification = () => {
  // const { newPostNotification } = useSelector((state) => state.home);

  const homeState = useSelector((state) => state.home);
  const newPostNotification = homeSelector.newPostNotification(homeState);

  return (
    <>
      {newPostNotification && (
        <div className="newPostNotification">
          <span>New Post &darr;</span>
        </div>
      )}
    </>
  );
};

export default NewPostNotification;
