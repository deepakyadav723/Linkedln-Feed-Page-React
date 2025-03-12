import { createContext, useReducer } from "react";
import homeReducer from "./Reducer";

const INITIAL_STATE = {
  filterApplied: false,
  sortApplied: false,
  newPostNotification: false,
};

export const HomeContext = createContext(INITIAL_STATE);

export const HomeContextProvider = ({ children }) => {
  const [state, homeContextDispatch] = useReducer(homeReducer, INITIAL_STATE);

  return (
    <HomeContext.Provider value={{
        filterApplied: state.filterApplied,
        sortApplied: state.sortApplied,
        newPostNotification: state.newPostNotification,
        homeContextDispatch,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
