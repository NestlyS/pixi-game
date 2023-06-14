import { useCallback, useEffect, useRef, useState } from 'react';

import { CleanEventType } from '../Body/typing';
import { TouchController } from '../controllers/TouchController';
import { AnimationList, useAnimationController } from '../controllers/AnimationController/context';
import { isAnyPairInUserBodyGroup } from '../../bodyGroups/user';
import { useBody } from '../Body/context';
import { useSlowerTick } from '../../utils/useSlowedTick';
import { setPause, setNovel, setGamePage } from '../../redux/gamePage';
import { Dialogs } from '../../redux/novelPage/typings';
import { useDispatch, useSelector } from 'react-redux';
import { Pages } from '../../redux/gamePage/typings';
import { initTutorialRead, syncGameFromLS } from '../../redux/gamePage/utils';
import {
  selectPageGameCurrentPage,
  selectPageGameIsTutorialRead,
} from '../../redux/gamePage/selectors';

export const GnidaTouchController = () => {
  const { body } = useBody();
  const [isScripted, setScripted] = useState(false);
  const page = useSelector(selectPageGameCurrentPage);
  const isTutorialRead = useSelector(selectPageGameIsTutorialRead);
  const { requestAnimation } = useAnimationController();
  const dispatch = useDispatch();
  const cb = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (cb.current && page === Pages.Main) {
      cb.current();
      cb.current = null;
      initTutorialRead();
      syncGameFromLS(dispatch);
    }
  }, [dispatch, page]);

  const onTouch = useCallback(
    (e: CleanEventType) => {
      if (!isAnyPairInUserBodyGroup(e.pairs)) return;

      const postCollision = () => {
        requestAnimation({ name: AnimationList.Run });
        setScripted(true);
      };

      if (!isTutorialRead) {
        cb.current = postCollision;
        dispatch(setPause());
        dispatch(setNovel(Dialogs.Gnida));
        dispatch(setGamePage(Pages.Novel));
        return;
      }

      postCollision();
    },
    [dispatch, isTutorialRead, requestAnimation],
  );

  useSlowerTick(() => {
    if (!isScripted) return;

    body.position.x -= 3;
  }, 5);

  if (isScripted) return null;

  return <TouchController onTouch={onTouch} />;
};
