import { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useControlKey2 } from '../../../../utils/useControlKey';
import { useBody } from '../../../Body/context';
import { applyForce } from '../../../Body/utils';
import { EPS, JUMP_KEY_CODE, JUMP_KEY_CODE_1, JUMP_KEY_CODE_2 } from '../../../../constants';
import { useGroundTouch } from '../../GroundTouchController/context';
import { AnimationList, useAnimationController } from '../../AnimationController/context';
import { Sounds, playSound } from '../../../../utils/soundController';
import { selectMainUserHurtedState } from '../../../../redux/mainUser/selectors';

const DEFAULT_JUMPS = 1;
const VERTICAL_SPEED = -10;

type Props = {
  maxJumps?: number;
};

export const JumpController = ({ maxJumps = DEFAULT_JUMPS }: Props) => {
  const [jumpsLeft, setJumps] = useState(maxJumps);
  const isHurted = useSelector(selectMainUserHurtedState);
  const { releaseAnimation, requestAnimation } = useAnimationController();

  const onChange = useCallback(
    (isGroundTouched: boolean) => {
      if (isGroundTouched) {
        setJumps(maxJumps);
      }
    },
    [maxJumps],
  );

  const { body } = useBody();
  useGroundTouch(onChange);

  const WCb = useCallback(() => {
    if (!body || isHurted || jumpsLeft <= 0 || body.velocity.y > EPS) return;
    applyForce(body, body.velocity.x, VERTICAL_SPEED);
    requestAnimation({
      name: AnimationList.Jump,
      onFinish: () => releaseAnimation(AnimationList.Jump),
    });
    playSound(Sounds.Jump);
    setJumps((val) => val - 1);
  }, [body, isHurted, jumpsLeft, releaseAnimation, requestAnimation]);

  useControlKey2(JUMP_KEY_CODE, WCb);
  useControlKey2(JUMP_KEY_CODE_1, WCb);
  useControlKey2(JUMP_KEY_CODE_2, WCb);
  return null;
};
