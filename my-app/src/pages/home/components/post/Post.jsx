import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import _map from "lodash/map";

import default_pfp from "../../assets/Default_pfp.jpg";
import likeIcon from "../../assets/like.png";
import commentIcon from "../../assets/comment.png";
import repostIcon from "../../assets/refresh.png";
import sendIcon from "../../assets/send.png";
import { generateRandomKey } from "../../helper/home.general";
import postsReader from "../../readers/posts.reader";

import "./post.css";

const Post = ({ ref, post }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleImageButton = (newImgIndax) => {
    setCurrentImgIndex(newImgIndax);
  };

  const name = postsReader.name(post) ?? "Name";
  const highlights = postsReader.highlights(post) ?? "Highlights";
  const description = postsReader.description(post) ?? "description";
  const profilePic = postsReader.profilePic(post) ?? "profilePic";
  const date = postsReader.date(post) ?? "date";
  const images = postsReader.images(post) ?? "images";
  const likes = postsReader.likes(post) ?? "likes";
  const comments = postsReader.comments(post) ?? "comments";

  const shortHightlight =
    highlights.length > 70 ? highlights.substr(0, 70) + "..." : highlights;

  const handleImageLoading = () => {
    setLoading(false);
  };

  const PostHeader = () => {
    return (
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
    );
  };

  const PostDescription = () => {
    return <div className="postDescription">{description}</div>;
  };

  const PostImages = () => {
    return (
      <div className="postImages">
        {loading && <span className="imgLoadingState">Loading Images...</span>}
        {_map(images, (imgSrc, ind) => (
          <img
            key={generateRandomKey()}
            className={cx(
              "postImg",
              {
                activeImage: ind === currentImgIndex,
              },
              { displayNone: loading }
            )}
            src={imgSrc}
            alt="Post-Image"
            onLoad={handleImageLoading}
          />
        ))}
        <button
          className={cx("slideLeftButton", {
            hideButton: currentImgIndex === 0,
          })}
          onClick={() => handleImageButton(currentImgIndex - 1)}
        >
          ❮
        </button>
        <button
          className={cx("slideRightButton", {
            hideButton: currentImgIndex === images.length - 1,
          })}
          onClick={() => handleImageButton(currentImgIndex + 1)}
        >
          ❯
        </button>
      </div>
    );
  };

  const PostFooter = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <div className="post" ref={ref}>
      <PostHeader />
      <PostDescription />
      <PostImages />
      <PostFooter />
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default memo(Post);
