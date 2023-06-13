import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CleanEventType } from '../Body/typing';
import { TouchController } from '../controllers/TouchController';
import { isUserLabel } from '../controllers/ConntectedSensorController/utils';
import { AnimationList, useAnimationController } from '../controllers/AnimationController/context';
import { makeHealToHealthEntity } from '../../redux/health';
import { getBodyId } from '../../utils/getBodyId';
import { Sounds, playSound } from '../../utils/soundController';
import { isAnyPairInUserBodyGroup } from '../../bodyGroups/user';
import {
  selectPageGameCurrentPage,
  selectPageGameIsMilenMet,
} from '../../redux/gamePage/selectors';
import { initMilenMet, syncGameFromLS } from '../../redux/gamePage/utils';
import { Pages } from '../../redux/gamePage/typings';
import { setGamePage, setNovel, setPause } from '../../redux/gamePage';
import { Dialogs } from '../../redux/novelPage/typings';

export const HealerTouchController = () => {
  const dispatch = useDispatch();
  const { requestAnimation } = useAnimationController();
  const isMilenMet = useSelector(selectPageGameIsMilenMet);
  const page = useSelector(selectPageGameCurrentPage);
  const [isHealed, setHealed] = useState(false);
  const cb = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (cb.current && page === Pages.Main) {
      cb.current();
      cb.current = null;
      initMilenMet();
      syncGameFromLS(dispatch);
    }
  }, [dispatch, page]);

  const onTouch = useCallback(
    (e: CleanEventType) => {
      const pairWithUser = isAnyPairInUserBodyGroup(e.pairs);

      if (!pairWithUser) return;

      const body = isUserLabel(pairWithUser.bodyA) ? pairWithUser.bodyA : pairWithUser.bodyB;

      if (!body) return;

      const postCollision = () => {
        dispatch(makeHealToHealthEntity({ amount: 1, id: getBodyId(body) }));
        setHealed(true);
        requestAnimation({ name: AnimationList.Heal });
        playSound(Sounds.Heal);
      };

      if (!isMilenMet) {
        cb.current = postCollision;
        dispatch(setPause());
        dispatch(setNovel(Dialogs.Milen));
        dispatch(setGamePage(Pages.Novel));
        return;
      }

      postCollision();
    },
    [dispatch, isMilenMet, requestAnimation],
  );

  if (isHealed) return null;

  return <TouchController onTouch={onTouch} />;
};
