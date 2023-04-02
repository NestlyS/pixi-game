import { createContext, useContext } from 'react';
import { __IS_DEV__ } from '../../../constants';

export const initialState = {
  isFocusedOnMainBody: true,
  onFocusedClick: () => {},
  setPaused: (val: boolean) => {},
  isCollisionVisible: __IS_DEV__,
  onCollisionVisibleClick: () => {},
  onFPSCounterClick: () => {},
};

const SettingsContext = createContext(initialState);

export const SettingsContextProvider = SettingsContext.Provider;
export const useSettings = () => {
  const {
    isFocusedOnMainBody,
    onFocusedClick,
    setPaused,
    isCollisionVisible,
    onCollisionVisibleClick,
    onFPSCounterClick,
  } = useContext(SettingsContext);

  return {
    onFocusedClick,
    setPaused,
    isFocusedOnMainBody,
    onCollisionVisibleClick,
    isCollisionVisible,
    onFPSCounterClick,
  };
};

export const initialPausedState = false;

const PausedContext = createContext(initialPausedState);

export const PausedContextProvider = PausedContext.Provider;
export const usePausedState = () => {
  const isPaused = useContext(PausedContext);

  return isPaused ?? initialPausedState;
};
