import { IAppState } from '..';

export const selectAppController = (state: IAppState) => state.appController;

export const selectAppControllerPage = (state: IAppState) => selectAppController(state).page;
