import React, { useState } from "react";

import NewPostNotification from "../newPostNotification/NewPostNotification";
import VirtualizedPostsList from "./VirtualizedPostsList";
// import VirtualizedListIO from "./VirtualizedListIO";
// import InfiniteScroll from "./InfiniteScroll";

import "./posts.css";

const WINDOW_HEIGHT = 578;

const Posts = () => {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <>
      <NewPostNotification />

      {/* Virtualization using scroll event */}
      <div className="posts" onScroll={handleScroll}>
        <VirtualizedPostsList
          scrollTop={scrollTop}
          windowHeight={WINDOW_HEIGHT}
        />
      </div>

      {/* Virtualization using intersaction observer */}
      {/* <VirtualizedListIO /> */}

      {/* Infinite scroll without virtualization */}
      {/* <InfiniteScroll /> */}
    </>
  );
};
export default Posts;
