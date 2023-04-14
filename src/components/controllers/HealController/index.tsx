import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useControlKey } from '../../../utils/useControlKey';
import { useBody } from '../../Body/context';
import { HEAL_KEY_CODE, HEAL_KEY_CODE_EXTRA, } from '../../../constants';
import { AnimationList, useAnimationController } from '../AnimationController/context';
import { useHealth } from '../../HealthStorage/context';
import { useGroundTouch } from '../GroundTouchController/context';
import { selectMainUserSpecialCooldown } from '../../../redux/mainUser/selectors';
import { setSpeciaCooldown } from '../../../redux/mainUser';

type Props = {
  cooldown: number;
};

export const HealController = ({ cooldown }: Props) => {
  const isTouching = useRef(false);
  const healCooldown = useSelector(selectMainUserSpecialCooldown);
  const dispatch = useDispatch();
  const { body } = useBody();
  const { setHealth } = useHealth(body);
  const { releaseAnimation, requestAnimation } = useAnimationController();
  const onChange = useCallback(
    (isGroundTouched: boolean) => {
      isTouching.current = isGroundTouched;
    },
    [],
  );

  useGroundTouch(onChange);
  const QCb = useCallback(() => {
    if (healCooldown || !isTouching.current) return;
    requestAnimation({
      name: AnimationList.Heal,
      onFinish: () => releaseAnimation(AnimationList.Heal),
    });
    dispatch(setSpeciaCooldown(cooldown));
    setTimeout(() => dispatch(setSpeciaCooldown(0)), cooldown);
    setHealth(val => val && (val + 1));
  }, [cooldown, healCooldown, releaseAnimation, requestAnimation, setHealth]);

  useControlKey(HEAL_KEY_CODE, QCb);
  useControlKey(HEAL_KEY_CODE_EXTRA, QCb);
  return null;
};
