import { IAppState } from '..';

export const selectPageGame = (state: IAppState) => state.game;

export const selectPageGamePauseState = (state: IAppState) => selectPageGame(state).isPaused;

export const selectPageGameSpeedMult = (state: IAppState) => selectPageGame(state).gameSpeedMult;

export const selectPageGameSpeedMultCalculated = (firstVal: number) => (state: IAppState) =>
  selectPageGameSpeedMult(state) * firstVal;

export const selectPageGameDistance = (state: IAppState) => selectPageGame(state).distanceCounter;

export const selectPageGameInitedState = (state: IAppState) => selectPageGame(state).isInited;

export const selectPageGameCurrentPage = (state: IAppState) => selectPageGame(state).page;

export const selectPageGameNovel = (state: IAppState) => selectPageGame(state).currentNovel;

export const selectPageGameIsTutorialCompleted = (state: IAppState) =>
  selectPageGame(state).isTutorialRead;

export const selectPageGameIsMilenMet = (state: IAppState) => selectPageGame(state).isMilenMet;
