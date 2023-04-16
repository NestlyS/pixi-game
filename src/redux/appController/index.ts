import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pages } from '../../constants';

type MainUserState = {
  page: Pages;
};

const initialState: MainUserState = {
  page: Pages.novel,
};

const appControllerSlice = createSlice({
  name: 'appController',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<Pages>) {
      state.page = action.payload;
    },
  },
});

export const appControllerReducer = appControllerSlice.reducer;
export const { setPage } = appControllerSlice.actions;
