import { IAppState } from '..';

export const selectMainUser = (state: IAppState) => state.mainUser;

export const selectMainUserId = (state: IAppState) => selectMainUser(state).id;

export const selectMainUserMaxHp = (state: IAppState) => selectMainUser(state).maxHp;

export const selectMainUserDirection = (state: IAppState) => selectMainUser(state).direction;

export const selectMainUserSpecialCooldown = (state: IAppState) =>
  selectMainUser(state).specialCooldown;

export const selectMainUserAttackCooldown = (state: IAppState) =>
  selectMainUser(state).attackCooldown;
