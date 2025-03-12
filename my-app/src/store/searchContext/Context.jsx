import { createContext, useReducer } from "react";
import searchReducer from "./Reducer"

const INITIAL_STATE = {
  searchApplied: false
};

export const SearchContext = createContext(INITIAL_STATE);

export const SearchContextProvider = ({ children }) => {
  const [state, searchContextDispatch] = useReducer(searchReducer, INITIAL_STATE);
  return (
    <SearchContext.Provider
      value={{
        searchApplied: state.searchApplied,
        searchContextDispatch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
