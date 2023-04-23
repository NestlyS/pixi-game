const TRASH_COUNTER = 'trashSum';

export const addCollectedTrash = (amount: number) => {
  window.localStorage.setItem(TRASH_COUNTER, String(amount));
};

export const getCollectedTrash = () => {
  return window.localStorage.getItem(TRASH_COUNTER) ?? null;
};
