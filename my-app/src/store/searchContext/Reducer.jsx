export default function searchReducer(state, action) {
  switch (action.type) {
    case "SEARCH_APPLIED":
      return {
        ...state,
        searchApplied: true,
      };
    case "SEARCH_NOT_APPLIED":
      return {
        ...state,
        searchApplied: false,
      };
    default:
      break;
  }
}
