import { memo, useCallback } from 'react';

import { HealthController } from '../../HealthController';
import { SoundTypes, Sounds, playSound } from '../../../../utils/soundController';
import { useGlobalViewportShaking } from '../../../GlobalViewport/hooks';
import { useAnimationController, AnimationList } from '../../AnimationController/context';
import { useDispatch } from 'react-redux';
import { resetSpeedMult } from '../../../../redux/gamePage';
import { setHurted, unsetHurted } from '../../../../redux/mainUser';

type Props = {
  initialHealth: number;
  maxHealth: number;
  cooldown?: number;
};

export const MainUserHealthController = memo(({ initialHealth, maxHealth, cooldown }: Props) => {
  const { requestAnimation, releaseAnimation } = useAnimationController();
  const shakeViewport = useGlobalViewportShaking();
  const dispatch = useDispatch();

  const onDamage = useCallback(
    (cooldown?: number) => {
      shakeViewport();
      playSound(Sounds.Hurt);
      dispatch(resetSpeedMult());
      dispatch(setHurted());
      requestAnimation({ name: AnimationList.Hurt });
      if (cooldown)
        setTimeout(() => {
          releaseAnimation(AnimationList.Hurt);
          dispatch(unsetHurted());
        }, cooldown);
    },
    [dispatch, releaseAnimation, requestAnimation, shakeViewport],
  );

  const onDamageEnd = useCallback(() => {
    releaseAnimation(AnimationList.Hurt);
    dispatch(unsetHurted());
  }, [dispatch, releaseAnimation]);

  return (
    <HealthController
      initialHealth={initialHealth}
      maxHealth={maxHealth}
      cooldown={cooldown}
      onDamage={onDamage}
      onDamageEnd={onDamageEnd}
    />
  );
});
