import { Dispatch } from '@reduxjs/toolkit';
import { LocalStorageKeyTypes, getFromLS, setToLS } from '../../utils/localStorage';
import { setMilenMet, setTutorialRead } from '.';
import { Pages } from './typings';

const READ_FLAG = '1';

export const addCollectedTrash = (amount: number) => {
  setToLS(LocalStorageKeyTypes.TrashCounter, amount);
};

export const getCollectedTrash = () => {
  return getFromLS(LocalStorageKeyTypes.TrashCounter) ?? 0;
};

export const initTutorialRead = () => {
  setToLS(LocalStorageKeyTypes.TutorialRead, READ_FLAG);
};

export const getIsTutorialRead = () => {
  return getFromLS(LocalStorageKeyTypes.TutorialRead) === READ_FLAG;
};

export const initMilenMet = () => {
  setToLS(LocalStorageKeyTypes.MilenMet, READ_FLAG);
};

export const getIsMilenMet = () => {
  return getFromLS(LocalStorageKeyTypes.MilenMet) === READ_FLAG;
};

export const syncGameFromLS = (dispatch: Dispatch) => {
  dispatch(setTutorialRead(getIsTutorialRead()));
  dispatch(setMilenMet(getIsMilenMet()));
};

export const getGamePageToShowAfterNovel = () => {
  if (!getIsTutorialRead()) {
    return Pages.TutorialStart;
  }

  return Pages.CharacterSelect;
};
