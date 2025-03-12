export default function homeReducer(state, action) {
  switch (action.type) {
    case "FILTER_APPLIED":
      return {
        ...state,
        filterApplied: true,
      };
    case "FILTER_NOT_APPLIED":
      return {
        ...state,
        filterApplied: false,
      };
    case "SORT_APPLIED":
      return {
        ...state,
        sortApplied: true,
      };
    case "SORT_NOT_APPLIED":
      return {
        ...state,
        sortApplied: false,
      };
    case "SHOW_NEWPOSTNOTIFICATION":
      return {
        ...state,
        newPostNotification: true,
      };
    case "NO_NEWPOSTNOTIFICATION":
      return {
        ...state,
        newPostNotification: false,
      };
    default:
      break;
  }
}
