import { IAppState } from '..';

export const selectAppController = (state: IAppState) => state.appController;

export const selectAppControllerPage = (state: IAppState) => selectAppController(state).page;

export const selectAppControllerWidth = (state: IAppState) => selectAppController(state).width;

export const selectAppControllerHeight = (state: IAppState) => selectAppController(state).height;

export const selectAppControllerScale = (state: IAppState) => selectAppController(state).scale;

export const selectAppControllerIsLowGraphicMode = (state: IAppState) =>
  selectAppController(state).isLowGraphicMode;

export const selectAppControllerIsMusicEnabled = (state: IAppState) =>
  selectAppController(state).isMusicOn;

export const selectAppControllerIsSoundsEnabled = (state: IAppState) =>
  selectAppController(state).isSoundsOn;
