import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pages } from './typings';
import { Dialogs } from '../novelPage/typings';

const MAX_AMOUNT = 2.5;

type GamePageState = {
  isPaused: boolean;
  isInited: boolean;
  isTutorialRead: boolean;
  isMilenMet: boolean;
  gameSpeedMult: number;
  distanceCounter: number;
  page: Pages;
  currentNovel: null | Dialogs;
};

const initialState: GamePageState = {
  isPaused: false,
  isInited: false,
  isTutorialRead: false,
  isMilenMet: false,
  gameSpeedMult: 1,
  distanceCounter: 0,
  page: Pages.CharacterSelect,
  currentNovel: null,
};

const gamePageSlice = createSlice({
  name: 'gamePage',
  initialState,
  reducers: {
    initGame: (state) => {
      state.isInited = true;
    },

    setTutorialRead: (state, action: PayloadAction<boolean>) => {
      state.isTutorialRead = action.payload;
    },

    setMilenMet: (state, action: PayloadAction<boolean>) => {
      state.isMilenMet = action.payload;
    },

    stopGame: (state) => {
      state.isInited = false;
    },

    setGamePage: (state, action: PayloadAction<Pages>) => {
      state.page = action.payload;
    },

    revertPlay: (state) => {
      state.isPaused = !state.isPaused;
    },

    setPause: (state) => {
      state.isPaused = true;
    },

    setPlay: (state) => {
      state.isPaused = false;
    },

    setNovel: (state, action: PayloadAction<Dialogs>) => {
      state.currentNovel = action.payload;
    },

    resetNovel: (state) => {
      state.currentNovel = null;
    },

    increaseSpeedMult: (state, action: PayloadAction<number>) => {
      if (state.gameSpeedMult >= MAX_AMOUNT) return;

      state.gameSpeedMult += action.payload;
    },

    resetSpeedMult: (state) => {
      state.gameSpeedMult = 1;
    },

    increaseDistanceCounter: (state, action: PayloadAction<number>) => {
      if (action.payload <= 0) return;

      state.distanceCounter += action.payload;
    },

    resetDistanceCounter: (state) => {
      state.distanceCounter = 0;
    },
  },
});

export const gamePageReducer = gamePageSlice.reducer;
export const {
  initGame,
  stopGame,
  setGamePage,
  setPause,
  setPlay,
  revertPlay,
  setNovel,
  resetNovel,
  increaseSpeedMult,
  resetSpeedMult,
  increaseDistanceCounter,
  resetDistanceCounter,
  setTutorialRead,
  setMilenMet,
} = gamePageSlice.actions;
