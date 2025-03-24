import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import _filter from "lodash/filter";
import _map from "lodash/map";
import _toLower from "lodash/toLower";
import _includes from "lodash/includes";
import _trim from "lodash/trim";

import ListItem from "./ListItem";
import { updateFilteredPosts } from "../../store/postsSlice";
import { searchAppliedFalse, searchAppliedTrue } from "../../store/homeSlice";
import linkedinIcon from "../../assets/linkedin.png";
import searchIcon from "../../assets/search.png";
import crossIcon from "../../assets/x-mark.png";
import { generateRandomKey } from "../../pages/home/helper/home.general";
import postsSelector from "../../reducers/posts.selector";

const SearchBar = () => {
  //   const { allPosts } = useSelector((state) => state.posts);
  // const { searchContextDispatch } = useContext(SearchContext);

  const postsState = useSelector((state) => state.posts);
  const allPosts = postsSelector.allPosts(postsState);
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [crossIconDisplay, setCrossIconDisplay] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const timeoutRef = useRef(null);

  const handleSearchInput = (event) => {
    const query = event.target.value;
    setSearchInputValue(query);
    debounceSearchHandler(query);
  };

  const debounce = (fun, delay) => {
    return function (...args) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        fun.apply(this, args);
      }, delay);
    };
  };

  const getData = (query) => {
    const searchedName = query.toLowerCase();
    const matchedUsers = [
      ...new Map(
        _map(
          _filter(allPosts, (user) => {
            return _includes(_toLower(user.name), searchedName);
          }),
          (user) => [user.name, user.profilePic]
        )
      ),
    ];

    if (_trim(searchedName).length > 0 && matchedUsers.length > 0) {
      setUsers(matchedUsers);
    } else {
      setUsers([]);
    }
  };

  const debounceSearchHandler = debounce(getData, 500);

  const handleSearch = (userName) => {
    const postShown = allPosts.filter((item) => {
      return item.name === userName;
    });
    // console.log(postShown);
    // postsContextDispatch({ type: "UPDATE_FILTERED_POSTS", payload: postShown });
    dispatch(updateFilteredPosts(postShown));
    // searchContextDispatch({ type: "SEARCH_APPLIED" });
    dispatch(searchAppliedTrue());
    setCrossIconDisplay(true);
    setUsers([]);
    setSearchInputValue(userName);
  };

  const handleCrossIcon = () => {
    // postsContextDispatch({ type: "UPDATE_FILTERED_POSTS", payload: allPosts });
    dispatch(updateFilteredPosts(allPosts));
    // searchContextDispatch({ type: "SEARCH_NOT_APPLIED" });
    dispatch(searchAppliedFalse());
    setSearchInputValue("");
    setCrossIconDisplay(false);
  };
  return (
    <>
      <img id="linkedinIcon" src={linkedinIcon} alt="Linkedln Icon" />
      <div className="searchBar">
        <input
          id="searchInput"
          type="text"
          placeholder="Search"
          onChange={handleSearchInput}
          value={searchInputValue}
        />
        <ul className="dropDownList">
          {_map(users, (user) => (
            <ListItem
              key={generateRandomKey()}
              name={user[0]}
              profilePic={user[1]}
              onClick={() => {
                handleSearch(user[0]);
              }}
            />
          ))}
        </ul>
      </div>
      <img id="searchIcon" src={searchIcon} alt="Search Icon" />
      {crossIconDisplay && (
        <img
          className="crossIcon"
          src={crossIcon}
          alt="Cross Icon"
          onClick={handleCrossIcon}
        />
      )}
    </>
  );
};

export default SearchBar;
