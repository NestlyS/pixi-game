import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_WORLD_HEIGHT, DEFAULT_WORLD_WIDTH, Pages } from '../../constants';
import { getSavedSettings, saveUserSettings } from './utils';
import { syncSoundSettings } from '../../utils/soundController';

type MainUserState = {
  page: Pages;
  width: number;
  height: number;
  scale: number;
  isLowGraphicMode: boolean;
  isSoundsOn: boolean;
  isMusicOn: boolean;
};

const initialState: MainUserState = {
  page: Pages.startScreen,
  width: DEFAULT_WORLD_WIDTH,
  height: DEFAULT_WORLD_HEIGHT,
  scale: 1,
  isLowGraphicMode: false,
  isSoundsOn: true,
  isMusicOn: true,
};

const appControllerSlice = createSlice({
  name: 'appController',
  initialState,
  reducers: {
    initSettings(state) {
      const values = getSavedSettings();
      state.isMusicOn = values.isMusicOn;
      state.isSoundsOn = values.isSoundOn;
      state.isLowGraphicMode = values.isLowGraphicMode;
    },

    setPage(state, action: PayloadAction<Pages>) {
      state.page = action.payload;
    },

    initResolution(state) {
      const windowHeightScale = window.innerHeight / DEFAULT_WORLD_HEIGHT;
      const windowWidthScale = window.innerWidth / DEFAULT_WORLD_WIDTH;

      state.scale = windowHeightScale > windowWidthScale ? windowWidthScale : windowHeightScale;

      console.log(
        window.innerHeight,
        window.innerHeight / windowHeightScale,
        window.innerWidth,
        windowHeightScale,
      );

      state.width = DEFAULT_WORLD_WIDTH * state.scale;
      state.height = DEFAULT_WORLD_HEIGHT * state.scale;
    },

    setLowGraphicMode(state) {
      state.isLowGraphicMode = true;
      saveUserSettings(state.isSoundsOn, state.isMusicOn, state.isLowGraphicMode);
    },

    setDefaultGraphicMode(state) {
      state.isLowGraphicMode = false;
      saveUserSettings(state.isSoundsOn, state.isMusicOn, state.isLowGraphicMode);
    },

    revertMusicState(state) {
      state.isMusicOn = !state.isMusicOn;
      saveUserSettings(state.isSoundsOn, state.isMusicOn, state.isLowGraphicMode);
      syncSoundSettings(state.isMusicOn, state.isSoundsOn);
    },

    revertSoundState(state) {
      state.isSoundsOn = !state.isSoundsOn;
      saveUserSettings(state.isSoundsOn, state.isMusicOn, state.isLowGraphicMode);
      syncSoundSettings(state.isMusicOn, state.isSoundsOn);
    },
  },
});

export const appControllerReducer = appControllerSlice.reducer;
export const {
  initSettings,
  setPage,
  initResolution,
  setLowGraphicMode,
  setDefaultGraphicMode,
  revertMusicState,
  revertSoundState,
} = appControllerSlice.actions;
