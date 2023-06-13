import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ActionTypes, CharNames, Dialogs, NewScriptType, NovelControllerState } from './typings';
import { updateState } from './utils';

const initialState: NovelControllerState = {
  script: null,
  page: 0,
  currentDialog: Dialogs.First,
  background: '',
  text: '',
  actionType: ActionTypes.Default,
  sound: null,
  effect: null,
  leftCharacter: {
    name: CharNames.Eva,
    state: 'idle',
    isActive: false,
    pose: 'idle',
  },
  rightCharacter: {
    name: CharNames.Eva,
    state: 'idle',
    isActive: false,
    pose: 'idle',
  },
};

const novelPageSlice = createSlice({
  name: 'novelPage',
  initialState,
  reducers: {
    setScript(state, action: PayloadAction<NewScriptType>) {
      state.script = action.payload;
    },

    goToDialog(state, action: PayloadAction<Dialogs>) {
      if (!state.script) return;
      console.log(action);
      state.currentDialog = action.payload;
      state.page = initialState.page;

      updateState(state, true);
    },

    goToTheNextNovelPage(state) {
      if (!state.script) return;

      state.page += 1;
      updateState(state);
    },
  },
});

export const novelPageReducer = novelPageSlice.reducer;
export const { setScript, goToTheNextNovelPage, goToDialog } = novelPageSlice.actions;
