import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useGlobalCheck } from '../../utils/useControlKey';
import { SignalList, useCatchSignal } from '../../utils/signaller/emitSignal';
import { Dialogs } from '../../redux/novelPage/typings';
import { setScript } from '../../redux/novelPage';
import { setPage } from '../../redux/appController';
import { useInitPageData } from '../../utils/initPageData';
import { NovelPageUI } from './components/NovelPageUI';
import { initNovelRead } from '../../redux/novelPage/utils';
import { setGamePage } from '../../redux/gamePage';
import { getPageToShowAfterNovel } from '../../redux/appController/utils';
import { getGamePageToShowAfterNovel } from '../../redux/gamePage/utils';
import { initNovelData } from './utils';

export const Novel = () => {
  const [resetCounter, setReset] = useState(0);
  const dispatch = useDispatch();

  const cb = useCallback(() => {
    setReset((val) => val + 1);
  }, []);

  const onAllScriptsEnd = useCallback(() => {
    initNovelRead();
    dispatch(setPage(getPageToShowAfterNovel()));
    dispatch(setGamePage(getGamePageToShowAfterNovel()));
  }, [dispatch]);

  const init = useCallback(async () => {
    dispatch(setScript(await initNovelData()));
  }, [dispatch]);

  useCatchSignal(SignalList.Reset, cb);
  useGlobalCheck();
  const isLoaded = useInitPageData(init);

  if (!isLoaded) return null;

  return <NovelPageUI key={resetCounter} onEnd={onAllScriptsEnd} dialog={Dialogs.First} />;
};
