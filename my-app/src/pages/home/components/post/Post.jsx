import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _map from "lodash/map";

import default_pfp from "../../assets/Default_pfp.jpg";
import likeIcon from "../../assets/like.png";
import commentIcon from "../../assets/comment.png";
import repostIcon from "../../assets/refresh.png";
import sendIcon from "../../assets/send.png";

import "./post.css";

const Post = ({ ref, post }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  function handleRightButton() {
    setCurrentImgIndex((currentImgIndex) => currentImgIndex + 1);
  }

  function handleLeftButton() {
    setCurrentImgIndex((currentImgIndex) => currentImgIndex - 1);
  }

  const {
    name,
    highlights,
    description,
    profilePic,
    date,
    images,
    likes,
    comments,
  } = post;

  const shortHightlight =
    highlights.length > 70 ? highlights.substr(0, 70) + "..." : highlights;

  return (
    <div className="post" ref={ref}>
      <div className="postHeader">
        <img
          className="postOwnerPic"
          src={profilePic ? profilePic : default_pfp}
          alt="User-Profile-Picture"
        />
        <div className="postInfo">
          <span className="postOwnerName">{name}</span>
          <span className="postOwnerHighlights">{shortHightlight}</span>
          <span className="postCreatedDate">{date}</span>
        </div>
      </div>
      <div className="postDescription">{description}</div>
      <div className="postImages">
        {_map(images, (imgSrc, ind) => (
          <img
            key={Math.random() * 10 + new Date().toLocaleDateString()}
            className={cx("postImg", { activeImage: ind === currentImgIndex })}
            src={imgSrc}
            alt="Post-Image"
          />
        ))}
        <button
          className={cx("slideLeftButton", {
            hideButton: currentImgIndex === 0,
          })}
          onClick={handleLeftButton}
        >
          ❮
        </button>
        <button
          className={cx("slideRightButton", {
            hideButton: currentImgIndex === images.length - 1,
          })}
          onClick={handleRightButton}
        >
          ❯
        </button>
      </div>
      <div className="counts">
        <span className="likeCount postCountSections">{likes} likes</span>
        <span className="commentCount postCountSections">
          {comments} comments
        </span>
      </div>
      <hr />
      <div className="postFooter">
        <span className="like postFooterSections">
          <img className="postIcons" src={likeIcon} alt="Like Icon" />
          <span>Like</span>
        </span>
        <span className="comment postFooterSections">
          <img className="postIcons" src={commentIcon} alt="Comment Icon" />
          <span>Comment</span>
        </span>
        <span className="repost postFooterSections">
          <img className="postIcons" src={repostIcon} alt="Repost Icon" />
          <span>Repost</span>
        </span>
        <span className="send postFooterSections">
          <img className="postIcons" src={sendIcon} alt="Send Icon" />
          <span>Send</span>
        </span>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default memo(Post);
