import { Pages } from '../../constants';
import { getIsNovelReaded } from '../novelPage/utils';

const USER_SETTING_ID = 'usersettings';

export const saveUserSettings = (
  isSoundOn: boolean,
  isMusicOn: boolean,
  isLowGraphicMode: boolean,
) => {
  window.localStorage.setItem(
    USER_SETTING_ID,
    JSON.stringify([isSoundOn, isMusicOn, isLowGraphicMode]),
  );
};

export const getSavedSettings = () => {
  const data = window.localStorage.getItem(USER_SETTING_ID);
  const [isSoundOn, isMusicOn, isLowGraphicMode] = data ? JSON.parse(data) : [true, true, false];

  return {
    isSoundOn,
    isMusicOn,
    isLowGraphicMode,
  };
};

export const getPageToShowAfterNovel = () => {
  console.log('isReaded', getIsNovelReaded());
  if (!getIsNovelReaded()) {
    return Pages.novel;
  }

  return Pages.game;
};
