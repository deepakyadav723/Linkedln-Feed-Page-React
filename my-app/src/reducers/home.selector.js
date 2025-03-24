import _property from "lodash/property";
// import _flow from "lodash/flow";

// const homeReducer = _property("home");

// const filterApplied = _flow([homeReducer, _property("filterApplied")]);

// const sortApplied = _flow([homeReducer, _property("sortApplied")]);

// const searchApplied = _flow([homeReducer, _property("searchApplied")]);

// const newPostNotification = _flow([
//   homeReducer,
//   _property("newPostNotification"),
// ]);

const filterApplied = _property("filterApplied");

const sortApplied = _property("sortApplied");

const searchApplied = _property("searchApplied");

const newPostNotification = _property("newPostNotification");

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  filterApplied,
  sortApplied,
  searchApplied,
  newPostNotification,
};
