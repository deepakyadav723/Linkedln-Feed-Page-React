import React, { useState } from "react";

import NewPost from "../newPost/NewPost";
import ProfilePic from "../../assets/profile-pic.png";

import "./createNewPost.css";

const CreateNewPost = () => {
  const [showNewPost, setShowNewPost] = useState(false);

  const handleClick = (showNewPost) => {
    setShowNewPost(showNewPost);
  };

  return (
    <>
      <div className="createNewPost">
        <img
          className="createPostUserImg"
          src={ProfilePic}
          alt="User-Profile-Picture"
        />
        <button className="createPostButton" onClick={() => handleClick(true)}>
          Start a post, try writing with AI
        </button>
      </div>
      {showNewPost && (
        <NewPost
          setShowNewPost={setShowNewPost}
          handleCrossIcon={() => handleClick(false)}
        />
      )}
    </>
  );
};

export default CreateNewPost;
