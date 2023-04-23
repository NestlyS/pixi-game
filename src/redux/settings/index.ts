import { createSlice } from '@reduxjs/toolkit';
import { __IS_DEV__ } from '../../constants';

type InitialState = {
  isNotFocusedOnMainBody?: boolean;
  isCollisionVisible?: boolean;
  isFPSCounterVisible: boolean;
  isAutorunEnabled: boolean;
};

export const initialState: InitialState = {
  isFPSCounterVisible: true,
  isAutorunEnabled: !__IS_DEV__,
  ...(__IS_DEV__ ? { isCollisionVisible: true, isNotFocusedOnMainBody: false } : {}),
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    revertCollisions: (state) => {
      if (!__IS_DEV__) return;
      state.isCollisionVisible = !state.isCollisionVisible;
    },

    showCollisions: (state) => {
      if (!__IS_DEV__) return;
      state.isCollisionVisible = true;
    },

    hideCollisions: (state) => {
      if (!__IS_DEV__) return;
      state.isCollisionVisible = false;
    },

    revertFocusOnMainBody: (state) => {
      if (!__IS_DEV__) return;
      state.isNotFocusedOnMainBody = !state.isNotFocusedOnMainBody;
    },

    setFocusOnMainBody: (state) => {
      if (!__IS_DEV__) return;
      state.isNotFocusedOnMainBody = false;
    },

    unsetFocusOnMainBody: (state) => {
      if (!__IS_DEV__) return;
      state.isNotFocusedOnMainBody = true;
    },

    revertFPSCounter: (state) => {
      if (!__IS_DEV__) return;
      state.isFPSCounterVisible = !state.isFPSCounterVisible;
    },

    setAutorunEnabled: (state) => {
      state.isAutorunEnabled = true;
    },

    setAutorunDisabled: (state) => {
      state.isAutorunEnabled = false;
    },

    revertAutorunState: (state) => {
      state.isAutorunEnabled = !state.isAutorunEnabled;
    },

    showFPSCounter: (state) => {
      if (!__IS_DEV__) return;
      state.isFPSCounterVisible = true;
    },

    hideFPSCounter: (state) => {
      if (!__IS_DEV__) return;
      state.isFPSCounterVisible = false;
    },
  },
});

export const settingsReducer = settingsSlice.reducer;
export const {
  showCollisions,
  hideCollisions,
  revertCollisions,
  showFPSCounter,
  hideFPSCounter,
  revertFPSCounter,
  setFocusOnMainBody,
  unsetFocusOnMainBody,
  revertFocusOnMainBody,
  setAutorunEnabled,
  setAutorunDisabled,
  revertAutorunState,
} = settingsSlice.actions;
