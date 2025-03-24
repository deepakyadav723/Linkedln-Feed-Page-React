import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import _map from "lodash/map";
import PropTypes from "prop-types";

import {
  sortAppliedTrue,
  sortAppliedFalse,
} from "../../../../store/homeSlice.js";
import { updateCurrentPosts } from "../../../../store/postsSlice.js";
import { getSortedPosts } from "../../helper/home.general.js";
import { sortOptions } from "../../../../data.js";
import postsSelector from "../../../../reducers/posts.selector.js";
// import { PostsContext } from "../../store/postsContext/Context.jsx";
// import { HomeContext } from "../../store/homeContext/homeContext.jsx";

const Sort = ({ sortOrder, setSortOrder }) => {
  // const { homeContextDispatch } = useContext(HomeContext);

  //   const { currentPosts } = useSelector((state) => state.posts);
  const postsState = useSelector((state) => state.posts);
  const currentPosts = postsSelector.currentPosts(postsState);
  const dispatch = useDispatch();

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    setSortedPosts(e.target.value);
  };

  const setSortedPosts = useCallback(
    (sortOrder) => {
      if (sortOrder === "") {
        // homeContextDispatch({ type: "SORT_NOT_APPLIED" });
        dispatch(sortAppliedFalse());
        return;
      }

      const sortedPosts = getSortedPosts(sortOrder, currentPosts);
      // postsContextDispatch({
      //   type: "UPDATE_CURRENT_POSTS",
      //   payload: [...sortedPosts],
      // });
      // homeContextDispatch({ type: "SORT_APPLIED" });

      dispatch(updateCurrentPosts(sortedPosts));
      dispatch(sortAppliedTrue());
    },
    [currentPosts, dispatch]
  );

  return (
    <div className="sort">
      <span className="sortHeading">Sort by:</span>
      <select
        id="sortOrder"
        className="sortOption"
        value={sortOrder}
        onChange={(e) => handleSortOrderChange(e)}
      >
        <option value="" disabled hidden>
          Select
        </option>
        {_map(sortOptions, (option) => (
          <option
            key={Math.random() * 10 + new Date().toLocaleDateString()}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Sort.propTypes = {
  sortOrder: PropTypes.string,
  setSortOrder: PropTypes.func,
};

Sort.defaultProps = {
  sortOrder: "",
  setSortOrder: () => {},
};

export default Sort;
