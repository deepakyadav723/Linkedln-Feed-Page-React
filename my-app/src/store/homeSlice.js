import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  filterApplied: false,
  sortApplied: false,
  searchApplied: false,
  newPostNotification: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState: INITIAL_STATE,
  reducers: {
    searchAppliedTrue: (state) => {
      state.searchApplied = true;
    },
    searchAppliedFalse: (state) => {
      state.searchApplied = false;
    },
    filterAppliedTrue: (state) => {
      state.filterApplied = true;
    },
    filterAppliedFalse: (state) => {
      state.filterApplied = false;
    },
    sortAppliedTrue: (state) => {
      state.sortApplied = true;
    },
    sortAppliedFalse: (state) => {
      state.sortApplied = false;
    },
    showNewPostNotification: (state) => {
      state.newPostNotification = true;
    },
    removeNewPostNotification: (state) => {
      state.newPostNotification = false;
    },
  },
});

export const {
  searchAppliedTrue,
  searchAppliedFalse,
  filterAppliedFalse,
  filterAppliedTrue,
  sortAppliedTrue,
  sortAppliedFalse,
  showNewPostNotification,
  removeNewPostNotification,
} = homeSlice.actions;

export default homeSlice.reducer;
