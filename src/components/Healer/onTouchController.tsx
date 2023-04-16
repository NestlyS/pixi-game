import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useBody } from '../Body/context';
import { CleanEventType } from '../Body/typing';
import { TouchController } from '../controllers/TouchController';
import { isUserLabel } from '../controllers/ConntectedSensorController/utils';
import { AnimationList, useAnimationController } from '../controllers/AnimationController/context';
import { makeHealToHealthEntity } from '../../redux/health';
import { getBodyId } from '../../utils/getBodyId';

export const HealerTouchController = () => {
  const { body } = useBody();
  const dispatch = useDispatch();
  const { requestAnimation } = useAnimationController();
  const [isHealed, setHealed] = useState(false);

  const onTouch = useCallback(
    (e: CleanEventType) => {
      console.log('TOUCH', { ...e });
      const secondBody = e.pairs[0].bodyA.id === body.id ? e.pairs[0].bodyB : e.pairs[0].bodyA;

      if (isUserLabel(secondBody)) {
        dispatch(makeHealToHealthEntity({ amount: 1, id: getBodyId(secondBody) }));
        setHealed(true);
        requestAnimation({ name: AnimationList.Heal });
      }
    },
    [body, requestAnimation],
  );

  if (isHealed) return null;

  return <TouchController onTouch={onTouch} />;
};
