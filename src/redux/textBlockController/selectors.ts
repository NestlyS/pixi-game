import { IAppState } from '..';

export const selectTextBlock = (state: IAppState) => state.textBlock;

export const selectTextBlockText = (state: IAppState) => selectTextBlock(state).text;

export const selectTextBlockCoords = (state: IAppState) => ({
  x: selectTextBlock(state).x,
  y: selectTextBlock(state).y,
});

export const selectTextBlockVisiblity = (state: IAppState) => selectTextBlock(state).isVisible;
