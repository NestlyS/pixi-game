import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ScriptType } from './typings';

type NovelControllerState<T = string> = {
  script: ScriptType<T>[] | null;
  page: number;
  dialog: number;
  currentText: string;
  restText: string;
  active: T;
  state: string;
};

const initialState: NovelControllerState = {
  script: null,
  page: 0,
  dialog: 0,
  currentText: '',
  restText: '',
  active: '',
  state: '',
};

const novelPageSlice = createSlice({
  name: 'novelPage',
  initialState,
  reducers: {
    setScript(state, action: PayloadAction<ScriptType[]>) {
      state.script = action.payload;
    },

    goToTheNextDialog(state) {
      if (!state.script || !state.script.length) return;

      state.dialog = state.dialog + 1;
      state.page = 0;
    },

    goToTheNextNovelPage(state) {
      if (
        !state.script ||
        !state.script.length ||
        state.script[state.dialog].dialog.length - 1 === state.page
      )
        return;

      state.page += 1;
    },

    initDialog(state) {
      if (!state.script?.[state.dialog]?.dialog[state.page]) return;

      const currentDialog = state.script?.[state.dialog]?.dialog[state.page];

      state.restText = currentDialog.text;
      state.currentText = '';
      state.active = currentDialog.active;
      state.state = currentDialog.state;
    },

    moveOneCharFromRestToVisibleText(state) {
      const firstChar = state.restText[0];

      if (!firstChar) return;

      state.restText = state.restText.slice(1);
      state.currentText += firstChar;
    },

    skipAllRestText(state) {
      state.currentText += state.restText;
      state.restText = '';
    },
  },
});

export const novelPageReducer = novelPageSlice.reducer;
export const {
  initDialog,
  setScript,
  skipAllRestText,
  moveOneCharFromRestToVisibleText,
  goToTheNextNovelPage,
  goToTheNextDialog,
} = novelPageSlice.actions;
