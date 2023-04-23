import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pages } from './typings';

const MAX_AMOUNT = 1.5;

type GamePageState = {
  isPaused: boolean;
  isInited: boolean;
  gameSpeedMult: number;
  distanceCounter: number;
  page: Pages;
};

const initialState: GamePageState = {
  isPaused: false,
  isInited: false,
  gameSpeedMult: 1,
  distanceCounter: 0,
  page: Pages.CharacterSelect,
};

const gamePageSlice = createSlice({
  name: 'gamePage',
  initialState,
  reducers: {
    initGame: (state) => {
      state.isInited = true;
      state.page = Pages.Main;
    },

    stopGame: (state) => {
      state.isInited = false;
    },

    setPage: (state, action: PayloadAction<Pages>) => {
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
  setPage,
  setPause,
  setPlay,
  revertPlay,
  increaseSpeedMult,
  resetSpeedMult,
  increaseDistanceCounter,
  resetDistanceCounter,
} = gamePageSlice.actions;
