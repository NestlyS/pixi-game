import { IAppState } from '..';

export const selectAppController = (state: IAppState) => state.appController;

export const selectAppControllerPage = (state: IAppState) => selectAppController(state).page;

export const selectAppControllerWidth = (state: IAppState) => selectAppController(state).width;

export const selectAppControllerHeight = (state: IAppState) => selectAppController(state).height;

export const selectAppControllerWidthScale = (state: IAppState) =>
  selectAppController(state).widthScale;

export const selectAppControllerHeightScale = (state: IAppState) =>
  selectAppController(state).heightScale;
