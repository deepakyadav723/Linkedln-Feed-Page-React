import _property from "lodash/property";
// import _flow from "lodash/flow";

// const postsReducer = _property("posts");

// const allPosts = _flow([postsReducer, _property("allPosts")]);

// const filteredPosts = _flow([postsReducer, _property("filteredPosts")]);

// const currentPosts = _flow([postsReducer, _property("currentPosts")]);

const allPosts = _property("allPosts");

const filteredPosts = _property("filteredPosts");

const currentPosts = _property("currentPosts");

// eslint-disable-next-line import/no-anonymous-default-export
export default { allPosts, filteredPosts, currentPosts };
