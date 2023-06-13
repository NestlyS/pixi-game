import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPageGameNovel } from '../../../../../../redux/gamePage/selectors';
import { resetNovel, setGamePage, setPlay } from '../../../../../../redux/gamePage';
import { NovelPageUI } from '../../../../../novel/components/NovelPageUI';
import { Pages } from '../../../../../../redux/gamePage/typings';
import { setScript } from '../../../../../../redux/novelPage';
import { initNovelData } from '../../../../../novel/utils';
import { initTutorialRead, syncGameFromLS } from '../../../../../../redux/gamePage/utils';

export const InGameNovelUI = () => {
  const novelName = useSelector(selectPageGameNovel);
  const [isLoaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    initNovelData()
      .then((script) => dispatch(setScript(script)))
      .then(() => setLoaded(true));
  }, [dispatch]);

  const onEnd = useCallback(() => {
    dispatch(resetNovel());
    dispatch(setGamePage(Pages.Main));
    dispatch(setPlay());
    initTutorialRead();
    syncGameFromLS(dispatch);
  }, [dispatch]);

  if (!novelName || !isLoaded) return null;

  return <NovelPageUI dialog={novelName} onEnd={onEnd} />;
};
