import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import _slice from "lodash/slice";
import _map from "lodash/map";
import Post from "../post/Post";

const BATCH_SIZE = 10;
const Posts = () => {
  const { currentPosts } = useSelector((state) => state.posts);
  const [startIndex, setStartIndex] = useState(0);

  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const observer = useRef(null);
  const containerRef = useRef(null);
  const timeoutRequire = useRef(false);

  const handleScroll = useCallback(
    (direction) => {
      setStartIndex((prevIndex) => {
        if (
          direction === "down" &&
          prevIndex + BATCH_SIZE < currentPosts.length
        ) {
          timeoutRequire.current = true;
          return prevIndex + 1;
        } else if (direction === "up" && prevIndex > 0) {
          timeoutRequire.current = true;
          return prevIndex - 1;
        } else {
          timeoutRequire.current = false;
          return prevIndex;
        }
      });
      if (timeoutRequire.current) {
        setTimeout(() => {
          if (containerRef.current) {
            const posts = containerRef.current.children;
            if (direction === "down" && posts.length > 1) {
              containerRef.current.scrollTo({ top: 5150, behavior: "instant" });
            } else if (direction === "up" && posts.length > 1) {
              containerRef.current.scrollTo({ top: 1250, behavior: "instant" });
            }
          }
        }, 0);
      }
    },
    [currentPosts.length]
  );

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === bottomRef.current) {
              handleScroll("down");
            } else if (entry.target === topRef.current) {
              handleScroll("up");
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (topRef.current) observer.current.observe(topRef.current);
    if (bottomRef.current) observer.current.observe(bottomRef.current);

    return () => {
      observer.current.disconnect();
    };
  }, [handleScroll]);

  const visiblePosts = _slice(
    currentPosts,
    startIndex,
    startIndex + BATCH_SIZE
  );

  return (
    <div className="posts" ref={containerRef}>
      {_map(visiblePosts, (post, index) => (
        <Post
          key={post.id || index}
          post={post}
          ref={
            index === 0
              ? topRef
              : index === visiblePosts.length - 1
              ? bottomRef
              : null
          }
        />
      ))}
    </div>
  );
};
export default Posts;
