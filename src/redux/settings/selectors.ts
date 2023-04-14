import { IAppState } from '..';

export const selectSettings = (state: IAppState) => state.settings;

export const selectSettingsFPSCounterVisiblity = (state: IAppState) =>
  selectSettings(state).isFPSCounterVisible;

export const selectSettingsCollisionsVisiblity = (state: IAppState) =>
  selectSettings(state).isCollisionVisible;

export const selectSettingsMainBodyFocus = (state: IAppState) =>
  selectSettings(state).isFocusedOnMainBody;

export const selectSettingsPauseState = (state: IAppState) => selectSettings(state).isPaused;
