import React from "react";
import { useSelector } from "react-redux";
import cx from "classnames";

// import { HomeContext } from "../../store/homeContext/Context";

import "./newPostNotification.css";

const NewPostNotification = () => {
  const { newPostNotification } = useSelector((state) => state.home);
  return (
    <div
      className={cx("newPostNotification", {
        displayNone: !newPostNotification,
      })}
    >
      <span>New Post &darr;</span>
    </div>
  );
};

export default NewPostNotification;
