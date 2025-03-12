import React, { useState } from "react";

import NewPost from "../newPost/NewPost";
import ProfilePic from "../../assets/profile-pic.png";

import "./createNewPost.css";

const CreateNewPost = () => {
  const [showNewPost, setShowNewPost] = useState(false);

  function handleCrossIcon() {
    setShowNewPost(false);
  }

  function handleClick() {
    setShowNewPost(true);
  }

  return (
    <>
      <div className="createNewPost">
        <img
          className="createPostUserImg"
          src={ProfilePic}
          alt="User-Profile-Picture"
        />
        <button className="createPostButton" onClick={handleClick}>
          Start a post, try writing with AI
        </button>
      </div>
      <NewPost
        showNewPost={showNewPost}
        setShowNewPost={setShowNewPost}
        handleCrossIcon={handleCrossIcon}
      />
    </>
  );
};

export default CreateNewPost;
