const NOVEL_READED_FLAG = 'isNovelReaded';

export const setNovelReaded = () => {
  window.localStorage.setItem(NOVEL_READED_FLAG, '1');
};

export const isNovelReaded = () => {
  return window.localStorage.getItem(NOVEL_READED_FLAG) === '1';
};
