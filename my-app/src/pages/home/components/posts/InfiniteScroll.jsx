import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _map from "lodash/map";
import Post from "../post/Post";
import { newPosts } from "../../../../data";
import { updateAllPosts } from "../../../../store/postsSlice";
import {
  removeNewPostNotification,
  showNewPostNotification,
} from "../../../../store/homeSlice";
import postsSelector from "../../../../reducers/posts.selector";
import homeSelector from "../../../../reducers/home.selector";
// import { PostsContext } from "../../store/postsContext/Context";
// import { HomeContext } from "../../store/homeContext/Context";
// import { SearchContext } from "../../store/searchContext/Context";

const InfiniteScroll = () => {
  // const { allPosts, currentPosts } = useSelector((state) => state.posts);

  const postsState = useSelector((state) => state.posts);
  const allPosts = postsSelector.allPosts(postsState);
  const currentPosts = postsSelector.currentPosts(postsState);

  // const { filterApplied, sortApplied, newPostNotification, searchApplied } =
  //   useSelector((state) => state.home);

  const homeState = useSelector((state) => state.home);
  const filterApplied = homeSelector.filterApplied(homeState);
  const sortApplied = homeSelector.sortApplied(homeState);
  const newPostNotification = homeSelector.newPostNotification(homeState);
  const searchApplied = homeSelector.searchApplied(homeState);

  // const { searchApplied } = useContext(SearchContext);
  const dispatch = useDispatch();

  const lastPostRef = useRef(null);
  const timeoutId = useRef(null);

  useEffect(() => {
    const lastPost = lastPostRef.current;
    if (lastPost === null) return;
    const Observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !filterApplied &&
          !sortApplied &&
          !searchApplied
        ) {
          // postsContextDispatch({ type: "UPDATE_ALL_POSTS", payload: [...allPosts, ...newPosts] });
          // homeContextDispatch({type: "SHOW_NEWPOSTNOTIFICATION"});

          dispatch(updateAllPosts([...allPosts, ...newPosts]));
          dispatch(showNewPostNotification());
        }
      },
      {
        threshold: 0.3,
      }
    );

    Observer.observe(lastPost);
    if (newPostNotification) {
      timeoutId.current = setTimeout(() => {
        // homeContextDispatch({type: "NO_NEWPOSTNOTIFICATION"});
        dispatch(removeNewPostNotification());
      }, 2000);
    }
    return () => {
      Observer.unobserve(lastPost);
      clearTimeout(timeoutId.current);
    };
  }, [
    searchApplied,
    sortApplied,
    filterApplied,
    newPostNotification,
    allPosts,
    dispatch,
  ]);

  return (
    <div className="posts">
      {_map(currentPosts, (post, ind) => {
        return (
          <Post
            ref={ind === currentPosts.length - 1 ? lastPostRef : null}
            key={Math.random() * 10 + new Date().toLocaleDateString()}
            post={post}
          />
        );
      })}
    </div>
  );
};

export default InfiniteScroll;
