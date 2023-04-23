import { IAppState } from '..';

export const selectSettings = (state: IAppState) => state.settings;

export const selectSettingsFPSCounterVisiblity = (state: IAppState) =>
  selectSettings(state).isFPSCounterVisible;

export const selectSettingsCollisionsVisiblity = (state: IAppState) =>
  selectSettings(state).isCollisionVisible;

export const selectSettingsAutorunState = (state: IAppState) =>
  selectSettings(state).isAutorunEnabled;

export const selectSettingsMainBodyFocus = (state: IAppState) =>
  selectSettings(state).isNotFocusedOnMainBody;
