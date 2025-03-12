import { createContext, useReducer } from "react";
import { posts } from "../../data";
import postsReducer from "./Reducer";

const INITIAL_STATE = {
  allPosts: [...posts],
  filteredPosts: [...posts],
  currentPosts: [...posts],
};

export const PostsContext = createContext(INITIAL_STATE);

export const PostsContextProvider = ({ children }) => {
  const [state, postsContextDispatch] = useReducer(postsReducer, INITIAL_STATE);

  return (
    <PostsContext.Provider value={{
        allPosts: state.allPosts,
        filteredPosts: state.filteredPosts,
        currentPosts: state.currentPosts,
        postsContextDispatch,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
