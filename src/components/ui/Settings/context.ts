import { createContext, useContext } from 'react';
import { __IS_DEV__ } from '../../..';

export const initialState = {
  isFocusedOnMainBody: true,
  isCollisionVisible: __IS_DEV__,
};

const SettingsContext = createContext(initialState);

export const SettingsContextProvider = SettingsContext.Provider;
export const useSettings = () => {
  const { isFocusedOnMainBody, isCollisionVisible } = useContext(SettingsContext);

  return {
    isFocusedOnMainBody,
    isCollisionVisible,
  };
};
