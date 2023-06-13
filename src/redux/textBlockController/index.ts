import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type DisplayBlockPayloadAction = PayloadAction<{ text: string; x: number; y: number }>;

type MainUserState = {
  isVisible: boolean;
  text: string;
  x: number;
  y: number;
};

const initialState: MainUserState = {
  isVisible: false,
  text: '',
  x: -1000,
  y: -1000,
};

const textBlockSlice = createSlice({
  name: 'textBlock',
  initialState,
  reducers: {
    displayBlock(state, action: DisplayBlockPayloadAction) {
      state.text = action.payload.text;
      state.x = action.payload.x;
      state.y = action.payload.y;
      state.isVisible = true;
    },

    resetBlock(state) {
      state.text = initialState.text;
      state.x = initialState.x;
      state.y = initialState.y;
      state.isVisible = false;
    },
  },
});

export const textBlockReducer = textBlockSlice.reducer;
export const { displayBlock, resetBlock } = textBlockSlice.actions;
