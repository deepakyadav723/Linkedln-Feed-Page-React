import { createSlice } from "@reduxjs/toolkit";
import { posts } from "../data";

const INITIAL_STATE = {
  allPosts: [...posts],
  filteredPosts: [...posts],
  currentPosts: [...posts],
};

const postsSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  reducers: {
    updateAllPosts: (state, action) => {
      state.allPosts = action.payload;
      state.filteredPosts = action.payload;
      state.currentPosts = action.payload;
    },
    updateFilteredPosts: (state, action) => {
      state.filteredPosts = action.payload;
      state.currentPosts = action.payload;
    },
    updateCurrentPosts: (state, action) => {
      state.currentPosts = action.payload;
    },
  },
});

export const { updateAllPosts, updateCurrentPosts, updateFilteredPosts } =
  postsSlice.actions;

export default postsSlice.reducer;
