import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./homeSlice";
import postsReducer from "./postsSlice";

export const store = configureStore({
  reducer: { home: homeReducer, posts: postsReducer },
});
