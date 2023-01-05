import { createContext, useContext } from "react";

export const initialState = {
  isFocusedOnMainBody: true,
  isCollisionVisible: true,
}

const SettingsContext = createContext(initialState);

export const SettingsContextProvider = SettingsContext.Provider;
export const useSettings = () => {
  const {
    isFocusedOnMainBody,
    isCollisionVisible,
  } = useContext(SettingsContext);

  return {
    isFocusedOnMainBody,
    isCollisionVisible,
  }
}