import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import PropTypes from "prop-types";

import {
  filterAppliedTrue,
  filterAppliedFalse,
  sortAppliedFalse,
} from "../../../../store/homeSlice.js";
import { updateCurrentPosts } from "../../../../store/postsSlice.js";
import { getFilteredPosts } from "../../helper/home.general.js";
import calenderIcon from "../../assets/calendar.png";
import postsSelector from "../../../../reducers/posts.selector.js";
// import { PostsContext } from "../../store/postsContext/Context.jsx";
// import { HomeContext } from "../../store/homeContext/homeContext.jsx";

const FilterByDate = ({ setSortOrder }) => {
  // const { homeContextDispatch } = useContext(HomeContext);

  //   const { filteredPosts } = useSelector((state) => state.posts);
  const postsState = useSelector((state) => state.posts);
  const filteredPosts = postsSelector.filteredPosts(postsState);

  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [selectDatesDisplay, setSelectDatesDisplay] = useState(false);

  const applyFilter = useCallback(
    (startDate, endDate) => {
      if (startDate === "") {
        setStartDateError(true);
      } else if (endDate === "") {
        setEndDateError(true);
      } else {
        const postShown = getFilteredPosts(startDate, endDate, filteredPosts);
        // console.log(postShown);

        // postsContextDispatch({
        //   type: "UPDATE_CURRENT_POSTS",
        //   payload: postShown,
        // });
        // homeContextDispatch({ type: "FILTER_APPLIED" });

        dispatch(updateCurrentPosts(postShown));
        dispatch(filterAppliedTrue());
        setSelectDatesDisplay(false);
        setSortOrder("");
      }
    },
    [dispatch, filteredPosts, setSortOrder]
  );

  const resetFilter = useCallback(() => {
    // postsContextDispatch({
    //   type: "UPDATE_CURRENT_POSTS",
    //   payload: filteredPosts,
    // });
    // homeContextDispatch({ type: "FILTER_NOT_APPLIED" });
    // homeContextDispatch({ type: "SORT_NOT_APPLIED" });

    dispatch(updateCurrentPosts(filteredPosts));
    dispatch(filterAppliedFalse());
    dispatch(sortAppliedFalse());
    setStartDate("");
    setEndDate("");
    setSortOrder("");
    setStartDateError(false);
    setEndDateError(false);
    setSelectDatesDisplay(false);
  }, [dispatch, filteredPosts, setSortOrder]);

  function handleDateSpanClick() {
    setSelectDatesDisplay(!selectDatesDisplay);
  }
  return (
    <div className="filter">
      <div className="filterByDate">
        <span className="filterHeading">Filter:</span>
        <span className="filterOption" onClick={handleDateSpanClick}>
          Date{" "}
          <img
            className="calenderIcon"
            src={calenderIcon}
            alt="Calendar Icon"
          />
        </span>
      </div>
      <div className={cx("selectDates", { displayNone: !selectDatesDisplay })}>
        <div className="dates">
          <label htmlFor="startDate">From:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            max={new Date().toISOString().split("T")[0]}
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            onFocus={() => {
              setStartDateError(false);
            }}
          />
        </div>
        <p className={cx("startDateError", { displayNone: !startDateError })}>
          Please select a date!
        </p>
        <div className="dates">
          <label htmlFor="endDate">To:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            max={new Date().toISOString().split("T")[0]}
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            onFocus={() => {
              setEndDateError(false);
            }}
          />
        </div>
        <p className={cx("endDateError", { displayNone: !endDateError })}>
          Please select a date!
        </p>
        <div className="filterButtons">
          <button
            id="applyButton"
            onClick={() => {
              applyFilter(startDate, endDate);
            }}
          >
            Apply
          </button>
          <button id="resetButton" onClick={resetFilter}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

FilterByDate.propTypes = {
  setSortOrder: PropTypes.func,
};

FilterByDate.defaultProps = {
  setSortOrder: () => {},
};

export default FilterByDate;
