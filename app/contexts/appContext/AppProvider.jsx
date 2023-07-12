"use client";

import { createContext, useContext, useReducer } from "react";
import { appReducer } from "./AppReducer";
import { SET_CATALOG } from "../actions";

const appInitialState = {
  catalog_year: 2023,
};

const AppContext = createContext(appInitialState);

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, appInitialState);
  // Declare any state fucntion here
  // and pass through value props in AppContext.Provider

  const setCatalog = (catalog_year) => {
    dispatch({ type: SET_CATALOG, payload: catalog_year });
  };

  return (
    <AppContext.Provider value={{ ...state, setCatalog }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
