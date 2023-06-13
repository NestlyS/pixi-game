import { IAppState } from '..';

export const selectMainUser = (state: IAppState) => state.mainUser;

export const selectMainUserId = (state: IAppState) => selectMainUser(state).id;

export const selectMainUserMaxHp = (state: IAppState) => selectMainUser(state).maxHp;

export const selectMainUserDirection = (state: IAppState) => selectMainUser(state).direction;

export const selectMainUserStoppedState = (state: IAppState) => selectMainUser(state).isStopped;

export const selectMainUserTrash = (state: IAppState) => selectMainUser(state).trashCount;

export const selectMainUserTrashSum = (state: IAppState) =>
  Object.values(selectMainUserTrash(state)).reduce((acc, item) => acc + item, 0);

export const selectMainUserSpecialCooldown = (state: IAppState) =>
  selectMainUser(state).specialCooldown;

export const selectMainUserAttackCooldown = (state: IAppState) =>
  selectMainUser(state).attackCooldown;

export const selectMainUserHurtedState = (state: IAppState) => selectMainUser(state).isHurted;
