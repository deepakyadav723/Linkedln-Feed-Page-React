import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Post from "../post/Post.jsx";
import { newPosts } from "../../../../data.js";
import { updateAllPosts } from "../../../../store/postsSlice.js";
import {
  removeNewPostNotification,
  showNewPostNotification,
} from "../../../../store/homeSlice.js";
import { useWindowListener } from "../../../../hooks/hooks.general.js";
import postsSelector from "../../../../reducers/posts.selector.js";
import homeSelector from "../../../../reducers/home.selector.js";

const OVER_SCANED = 3;

const VirtualizedPostsList = ({ windowHeight, scrollTop }) => {
  const postsState = useSelector((state) => state.posts);
  const allPosts = postsSelector.allPosts(postsState);
  const currentPosts = postsSelector.currentPosts(postsState);

  const homeState = useSelector((state) => state.home);
  const filterApplied = homeSelector.filterApplied(homeState);
  const newPostNotification = homeSelector.newPostNotification(homeState);
  const sortApplied = homeSelector.sortApplied(homeState);
  const searchApplied = homeSelector.searchApplied(homeState);

  const dispatch = useDispatch();

  const timeoutId = useRef(null);
  const postRef = useRef(null);
  const [itemHeight, setItemHeight] = useState(704);

  const numberOfItems = currentPosts.length;

  const handleWindowResize = useCallback(() => {
    if (postRef.current === null) return;
    setItemHeight(postRef.current.offsetHeight);
  }, []);
  useWindowListener("resize", handleWindowResize);

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / itemHeight) - OVER_SCANED
  );

  const renderedNodesCount = Math.min(
    numberOfItems - startIndex,
    Math.floor(windowHeight / itemHeight) + 2 * OVER_SCANED
  );

  useEffect(() => {
    if (numberOfItems - startIndex <= renderedNodesCount) {
      if (!filterApplied && !sortApplied && !searchApplied) {
        dispatch(updateAllPosts([...allPosts, ...newPosts]));
        dispatch(showNewPostNotification());
      }
    }
    if (newPostNotification) {
      timeoutId.current = setTimeout(() => {
        dispatch(removeNewPostNotification());
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [
    allPosts,
    dispatch,
    filterApplied,
    newPostNotification,
    numberOfItems,
    renderedNodesCount,
    searchApplied,
    sortApplied,
    startIndex,
  ]);

  const visiblePosts = useMemo(() => {
    let visiblePosts = [];
    for (let i = 0; i < renderedNodesCount; i++) {
      const index = i + startIndex;
      visiblePosts.push(
        <Post ref={postRef} key={index} post={currentPosts[index]} />
      );
    }
    return visiblePosts;
  }, [currentPosts, renderedNodesCount, startIndex]);

  return (
    <>
      <div
        style={{
          height: `${numberOfItems * (itemHeight - 13)}px`,
        }}
      >
        <div
          style={{
            transform: `translateY(${startIndex * itemHeight}px)`,
          }}
        >
          {visiblePosts}
        </div>
      </div>
    </>
  );
};

VirtualizedPostsList.propTypes = {
  WINDOW_HEIGHT: PropTypes.number,
  scrollTop: PropTypes.number,
};

VirtualizedPostsList.defaultProps = {
  WINDOW_HEIGHT: 578,
  scrollTop: 0,
};

export default VirtualizedPostsList;
