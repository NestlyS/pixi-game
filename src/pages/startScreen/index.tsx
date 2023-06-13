import { Assets } from 'pixi.js';
import { useCallback } from 'react';

import { useGlobalCheck } from '../../utils/useControlKey';
import { useInitPageData } from '../../utils/initPageData';
import { StartUI } from './components/StartUI';
import { initSoundBundle } from '../../utils/soundController';
import { useDispatch } from 'react-redux';
import { setPage } from '../../redux/appController';
import { getPageToShowAfterNovel } from '../../redux/appController/utils';
import { setGamePage } from '../../redux/gamePage';
import { getGamePageToShowAfterNovel } from '../../redux/gamePage/utils';

const SCREEN_BUNDLE = 'start-screen';

export const StartScreen = () => {
  const dispatch = useDispatch();

  const init = useCallback(async () => {
    await Assets.loadBundle('start-screen');
    initSoundBundle(SCREEN_BUNDLE);
  }, []);

  useGlobalCheck();
  const isLoaded = useInitPageData(init);

  const onEnd = useCallback(() => {
    dispatch(setPage(getPageToShowAfterNovel()));
    dispatch(setGamePage(getGamePageToShowAfterNovel()));
  }, [dispatch]);

  if (!isLoaded) return null;

  return <StartUI onEnd={onEnd} />;
};
