import { memo, useCallback } from 'react';

import { HealthController } from '../../HealthController';
import { playSound } from '../../../../utils/soundPlayer';
import { useGlobalViewportShaking } from '../../../GlobalViewport/hooks';
import { useAnimationController, AnimationList } from '../../AnimationController/context';
import { useDispatch } from 'react-redux';
import { resetSpeedMult } from '../../../../redux/gamePage';
import { releasePlayer, stopPlayer } from '../../../../redux/mainUser';

const HURT_SOUND = 'evaHurtSnd';

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
      playSound(HURT_SOUND);
      dispatch(resetSpeedMult());
      dispatch(stopPlayer());
      requestAnimation({ name: AnimationList.Hurt });
      if (cooldown)
        setTimeout(() => {
          releaseAnimation(AnimationList.Hurt);
          dispatch(releasePlayer());
        }, cooldown);
    },
    [dispatch, releaseAnimation, requestAnimation, shakeViewport],
  );

  const onDamageEnd = useCallback(() => {
    releaseAnimation(AnimationList.Hurt);
    dispatch(releasePlayer());
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
