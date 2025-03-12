export default function postsReducer(state, action) {
  switch (action.type) {
    case "UPDATE_ALL_POSTS":
      return {
        allPosts: action.payload,
        filteredPosts: action.payload,
        currentPosts: action.payload,
      };
    case "UPDATE_FILTERED_POSTS":
      return {
        ...state,
        filteredPosts: action.payload,
        currentPosts: action.payload,
      };
    case "UPDATE_CURRENT_POSTS":
      return {
        ...state,
        currentPosts: action.payload,
      };
    default:
      break;
  }
}
