import { useCallback, useState } from 'react';
import { useHealth } from '../HealthStorage/context';
import { useBody } from '../Body/context';
import { CleanEventType } from '../Body/typing';
import { TouchController } from '../controllers/TouchController';
import { isUserLabel } from '../controllers/ConntectedSensorController/utils';
import { AnimationList, useAnimationController } from '../controllers/AnimationController/context';

export const HealerTouchController = () => {
  const { body } = useBody();
  const { setHealth } = useHealth();
  const { requestAnimation } = useAnimationController();
  const [isHealed, setHealed] = useState(false);

  const onTouch = useCallback(
    (e: CleanEventType) => {
      console.log('TOUCH', { ...e });
      const secondBody = e.pairs[0].bodyA.id === body.id ? e.pairs[0].bodyB : e.pairs[0].bodyA;

      if (isUserLabel(secondBody)) {
        setHealth((hp) => hp && hp + 1, secondBody);
        setHealed(true);
        requestAnimation({ name: AnimationList.Heal });
      }
    },
    [body, requestAnimation, setHealth],
  );

  if (isHealed) return null;

  return <TouchController onTouch={onTouch} />;
};
