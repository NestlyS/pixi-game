import { createSlice } from '@reduxjs/toolkit';
import { __IS_DEV__ } from '../../constants';

type InitialState = {
  isFocusedOnMainBody?: boolean;
  isCollisionVisible?: boolean;
  isFPSCounterVisible: boolean;
  isPaused: boolean;
};

export const initialState: InitialState = {
  isPaused: false,
  isFPSCounterVisible: true,
  ...(__IS_DEV__ ? { isCollisionVisible: true, isFocusedOnMainBody: true } : {}),
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    revertPlay: (state) => {
      state.isPaused = !state.isPaused;
    },

    setPause: (state) => {
      state.isPaused = true;
    },

    setPlay: (state) => {
      state.isPaused = false;
    },

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
      state.isFocusedOnMainBody = !state.isFocusedOnMainBody;
    },

    setFocusOnMainBody: (state) => {
      if (!__IS_DEV__) return;
      state.isFocusedOnMainBody = true;
    },

    unsetFocusOnMainBody: (state) => {
      if (!__IS_DEV__) return;
      state.isFocusedOnMainBody = false;
    },

    revertFPSCounter: (state) => {
      if (!__IS_DEV__) return;
      state.isFPSCounterVisible = !state.isFPSCounterVisible;
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
  setPause,
  setPlay,
  revertPlay,
  showCollisions,
  hideCollisions,
  revertCollisions,
  showFPSCounter,
  hideFPSCounter,
  revertFPSCounter,
  setFocusOnMainBody,
  unsetFocusOnMainBody,
  revertFocusOnMainBody,
} = settingsSlice.actions;
