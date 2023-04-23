import { IAppState } from '..';

export const selectNovelController = (state: IAppState) => state.novel;

export const selectNovelControllerPage = (state: IAppState) => selectNovelController(state).page;

export const selectNovelControllerDialogPage = (state: IAppState) =>
  selectNovelController(state).dialog;

export const selectNovelControllerScript = (state: IAppState) =>
  selectNovelController(state).script;

export const selectNovelControllerText = (state: IAppState) =>
  selectNovelController(state).currentText;

export const selectNovelControllerRestText = (state: IAppState) =>
  selectNovelController(state).restText;

export const selectNovelControllerState = (state: IAppState) => selectNovelController(state).state;

export const selectNovelControllerActive = (state: IAppState) =>
  selectNovelController(state).active;
