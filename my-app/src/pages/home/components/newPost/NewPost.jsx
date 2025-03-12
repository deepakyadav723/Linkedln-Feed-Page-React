import React, { memo, useCallback, useRef } from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { updateAllPosts } from "../../../../store/postsSlice";
import downArrowIcon from "../../assets/down-arrow.png";
import profilePic from "../../assets/profile-pic.png";
import xMarkIcon from "../../assets/x-mark.png";
import selectPhotoIcon from "../../assets/photo.png";
import calenderIcon from "../../assets/calendar.png";
import plusIcon from "../../assets/plus.png";
import sparklingIcon from "../../assets/sparkling.png";

import "./newPost.css";

const NewPost = ({ showNewPost, setShowNewPost, handleCrossIcon }) => {
  const descRef = useRef(null);
  const { allPosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    function handleSubmit(event) {
      event.preventDefault();
      const desc = descRef.current.value;
      const newPost = [
        {
          name: "Deepak Yadav",
          profilePic: profilePic,
          highlights:
            "ASE Intern @Tekion || NITRR CSE'25 || Guardian (Leetcode: 2148) || Specialist (Codeforces- Rating: 1426)",
          date: new Date().toLocaleDateString(),
          description: desc,
          images: [
            "https://images.unsplash.com/photo-1518770660439-4636190af475",
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
          ],
          likes: 0,
          comments: 0,
        },
      ];
      dispatch(updateAllPosts([...newPost, ...allPosts]));
      setShowNewPost(false);
      descRef.current.value = "";
    },
    [allPosts, dispatch, setShowNewPost]
  );

  return (
    <div className={cx("newPostSection", { displayNone: !showNewPost })}>
      <form id="newPost" className="newPost" onSubmit={handleSubmit}>
        <div className="newPostHeader">
          <div className="newPostHeaderLeft">
            <img
              className="createPostUserImg"
              src={profilePic}
              alt="User-Profile-Picture"
            />
            <div>
              <h4 id="userName">Deepak Yadav</h4>
              <div className="postOptions">
                <p>Post to Anyone</p>
                <img
                  className="postOptionsIcon"
                  src={downArrowIcon}
                  alt="down-arrow"
                />
              </div>
            </div>
          </div>
          <button
            style={{ border: "none", background: "none" }}
            type="reset"
            onClick={handleCrossIcon}
          >
            <img
              className="createNewPostCrossIcon"
              src={xMarkIcon}
              alt="Cross Icon"
            />
          </button>
        </div>
        <div className="newPostMiddleSection">
          <textarea
            ref={descRef}
            id="newPostDescription"
            placeholder="What do you wnat to talk about?"
            required
          ></textarea>
          <div className="newPostMiddleSectionIcons">
            <span>
              <img src={sparklingIcon} alt="sparkling icon" />
              Rewrite with AI
            </span>
            <img src={selectPhotoIcon} alt="Select-photo" />
            <img src={calenderIcon} alt="Calendar Icon" />
            <img src={plusIcon} alt="Plus-Icon" />
          </div>
        </div>
        <hr />
        <div className="newPostFooter">
          <button type="reset" style={{ marginRight: ".5rem" }}>
            Reset
          </button>
          <button style={{ color: "#0a66c2" }}>Post</button>
        </div>
      </form>
    </div>
  );
};

NewPost.propTypes = {
  showNewPost: PropTypes.bool,
  setShowNewPost: PropTypes.func,
  handleCrossIcon: PropTypes.func,
};

NewPost.defaultProps = {
  showNewPost: false,
};

export default memo(NewPost);
