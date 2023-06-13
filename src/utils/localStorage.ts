export enum LocalStorageKeyTypes {
  TrashCounter = 'trashCounter',
  TutorialRead = 'isTutorialRead',
  MilenMet = 'isMilenMet',
  NovelRead = 'isNovelReaded',
}

export const setToLS = (key: LocalStorageKeyTypes, val: unknown) => {
  window.localStorage.setItem(key, String(val));
};

export const getFromLS = (key: LocalStorageKeyTypes) => {
  return window.localStorage.getItem(key);
};
