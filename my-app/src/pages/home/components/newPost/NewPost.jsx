import React, { memo, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { updateAllPosts } from "../../../../store/postsSlice";
import downArrowIcon from "../../assets/down-arrow.png";
import crossIcon from "../../assets/x-mark.png";
import selectPhotoIcon from "../../assets/photo.png";
import calenderIcon from "../../assets/calendar.png";
import plusIcon from "../../assets/plus.png";
import sparklingIcon from "../../assets/sparkling.png";
import { user } from "../../../../data";
import { getRandomImages } from "../../helper/home.general";
import postsSelector from "../../../../reducers/posts.selector";

import "./newPost.css";

const NewPost = ({ setShowNewPost, handleCrossIcon }) => {
  const descRef = useRef(null);
  // const { allPosts } = useSelector((state) => state.posts);
  const postsState = useSelector((state) => state.posts);
  const allPosts = postsSelector.allPosts(postsState);
  const dispatch = useDispatch();

  const { name, highlights, profilePic } = user;

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const desc = descRef.current.value;
      const newPost = [
        {
          name: name,
          profilePic: profilePic,
          highlights: highlights,
          date: new Date().toLocaleDateString(),
          description: desc,
          images: getRandomImages(),
          likes: 0,
          comments: 0,
        },
      ];
      dispatch(updateAllPosts([...newPost, ...allPosts]));
      setShowNewPost(false);
      descRef.current.value = "";
    },
    [allPosts, dispatch, highlights, name, profilePic, setShowNewPost]
  );

  const NewPostHeader = () => {
    return (
      <>
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
            className="closeFormButton"
            type="reset"
            onClick={handleCrossIcon}
          >
            <img
              className="createNewPostCrossIcon"
              src={crossIcon}
              alt="Cross Icon"
            />
          </button>
        </div>
      </>
    );
  };

  const NewPostInputSection = () => {
    return (
      <>
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
      </>
    );
  };

  const NewPostFooter = () => {
    return (
      <>
        <div className="newPostFooter">
          <button type="reset" className="formResetButton">
            Reset
          </button>
          <button className="formSubmitButton">Post</button>
        </div>
      </>
    );
  };

  return (
    <div className="newPostSection">
      <form id="newPost" className="newPost" onSubmit={handleSubmit}>
        <NewPostHeader />
        <NewPostInputSection />
        <NewPostFooter />
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
