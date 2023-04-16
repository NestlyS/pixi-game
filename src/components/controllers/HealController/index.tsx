import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useControlKey } from '../../../utils/useControlKey';
import { HEAL_KEY_CODE, HEAL_KEY_CODE_EXTRA } from '../../../constants';
import { AnimationList, useAnimationController } from '../AnimationController/context';
import { useGroundTouch } from '../GroundTouchController/context';
import { selectMainUserSpecialCooldown } from '../../../redux/mainUser/selectors';
import { setSpeciaCooldown } from '../../../redux/mainUser';
import { makeHealToHealthEntity } from '../../../redux/health';
import { useBody } from '../../Body/context';
import { getBodyId } from '../../../utils/getBodyId';

type Props = {
  cooldown: number;
};

export const HealController = ({ cooldown }: Props) => {
  const isTouching = useRef(false);
  const healCooldown = useSelector(selectMainUserSpecialCooldown);
  const { body } = useBody();

  const dispatch = useDispatch();
  const { releaseAnimation, requestAnimation } = useAnimationController();
  const onChange = useCallback((isGroundTouched: boolean) => {
    isTouching.current = isGroundTouched;
  }, []);

  useGroundTouch(onChange);
  const QCb = useCallback(() => {
    if (healCooldown || !isTouching.current) return;
    requestAnimation({
      name: AnimationList.Heal,
      onFinish: () => releaseAnimation(AnimationList.Heal),
    });
    dispatch(setSpeciaCooldown(cooldown));
    setTimeout(() => dispatch(setSpeciaCooldown(0)), cooldown);
    dispatch(makeHealToHealthEntity({ id: getBodyId(body), amount: 1 }));
  }, [cooldown, healCooldown, releaseAnimation, requestAnimation]);

  useControlKey(HEAL_KEY_CODE, QCb);
  useControlKey(HEAL_KEY_CODE_EXTRA, QCb);
  return null;
};
