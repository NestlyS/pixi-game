import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_WORLD_HEIGHT, DEFAULT_WORLD_WIDTH, Pages } from '../../constants';

type MainUserState = {
  page: Pages;
  width: number;
  height: number;
  widthScale: number;
  heightScale: number;
};

const initialState: MainUserState = {
  page: Pages.novel,
  width: DEFAULT_WORLD_WIDTH,
  height: DEFAULT_WORLD_HEIGHT,
  widthScale: 1,
  heightScale: 1,
};

const appControllerSlice = createSlice({
  name: 'appController',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<Pages>) {
      state.page = action.payload;
    },

    setResolution(state, action: PayloadAction<{ width: number; height: number }>) {
      state.width = action.payload.width;
      state.height = action.payload.height;
      state.widthScale = DEFAULT_WORLD_WIDTH / action.payload.width;
      state.heightScale = DEFAULT_WORLD_HEIGHT / action.payload.height;
    },
  },
});

export const appControllerReducer = appControllerSlice.reducer;
export const { setPage, setResolution } = appControllerSlice.actions;
