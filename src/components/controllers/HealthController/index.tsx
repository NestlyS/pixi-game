import { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useBody } from '../../Body/context';
import { useGlobalViewportShaking } from '../../GlobalViewport/hooks';
import { AnimationList, useAnimationController } from '../AnimationController/context';

import { initHealthEntity, setInvicibility, unsetInvicibility } from '../../../redux/health';
import { Health } from '../../../redux/health/adapter';
import { selectHealthValueByBody } from '../../../redux/health/selectors';
import { getBodyId } from '../../../utils/getBodyId';

type Props = {
  initialHealth: number;
  maxHealth: number;
  cooldown?: number;
};

export const HealthController = memo(({ initialHealth, maxHealth, cooldown }: Props) => {
  const { body } = useBody();
  const { requestAnimation, releaseAnimation } = useAnimationController();

  const healthAmount = useSelector(selectHealthValueByBody(body));
  const prevValue = useRef<Health['value'] | null>(null);
  const dispatch = useDispatch();

  const shakeViewport = useGlobalViewportShaking();

  useEffect(() => {
    dispatch(initHealthEntity({ id: getBodyId(body), value: initialHealth, maxValue: maxHealth }));
  }, [initialHealth, maxHealth]);

  useEffect(() => {
    if (!healthAmount || !body) {
      return;
    }

    if (prevValue.current === null) {
      prevValue.current = healthAmount;
      return;
    }

    const isHealthDecrease = prevValue.current > healthAmount;
    prevValue.current = healthAmount;

    if (isHealthDecrease) {
      shakeViewport();
      requestAnimation({ name: AnimationList.Hurt });
    }

    if (isHealthDecrease && cooldown) {
      dispatch(setInvicibility(getBodyId(body)));
      setTimeout(() => {
        dispatch(unsetInvicibility(getBodyId(body)));
        releaseAnimation(AnimationList.Hurt);
      }, cooldown);
    }

    if (!isHealthDecrease) {
      releaseAnimation(AnimationList.Hurt);
    }
  }, [healthAmount, releaseAnimation, requestAnimation, shakeViewport]);

  return null;
});
