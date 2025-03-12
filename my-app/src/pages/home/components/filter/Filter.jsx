import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import _map from "lodash/map";

import {
  filterAppliedTrue,
  filterAppliedFalse,
  sortAppliedTrue,
  sortAppliedFalse,
} from "../../../../store/homeSlice.js";
import { updateCurrentPosts } from "../../../../store/postsSlice.js";
import { getFilteredPosts, getSortedPosts } from "../../helper/home.general.js";
import { sortOptions } from "../../../../data.js";
import calenderIcon from "../../assets/calendar.png";
// import { PostsContext } from "../../store/postsContext/Context.jsx";
// import { HomeContext } from "../../store/homeContext/homeContext.jsx";

import "./filter.css";

const Filter = () => {
  // const { homeContextDispatch } = useContext(HomeContext);

  const { currentPosts, filteredPosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [selectDatesDisplay, setSelectDatesDisplay] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const applyFilter = useCallback(
    function applyFilter(startDate, endDate) {
      if (startDate === "") {
        setStartDateError(true);
      } else if (endDate === "") {
        setEndDateError(true);
      } else {
        const postShown = getFilteredPosts(startDate, endDate, filteredPosts);
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
    [dispatch, filteredPosts]
  );

  const resetFilter = useCallback(
    function resetFilter() {
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
    },
    [dispatch, filteredPosts]
  );

  function handleSortOrderChange(e) {
    setSortOrder(e.target.value);
    setSortedPosts(e.target.value);
  }

  const setSortedPosts = useCallback(
    function setSortedPosts(sortOrder) {
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

  function handleDateSpanClick() {
    if (selectDatesDisplay) setSelectDatesDisplay(false);
    else setSelectDatesDisplay(true);
  }

  return (
    <div className="filtersSection">
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
        <div
          className={cx("selectDates", { displayNone: !selectDatesDisplay })}
        >
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
    </div>
  );
};

export default Filter;
