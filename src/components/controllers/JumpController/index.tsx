import { useCallback, useRef } from 'react';
import { useControlKey } from '../../../utils/useControlKey';
import { useBody, useBodyParams } from '../../Body/context';
import { applyForce } from '../../Body/utils';
import { EPS } from '../../../constants';
import { useGroundTouch } from '../GroundTouchController/context';
import { AnimationList, useAnimationController } from '../AnimationController/context';

const DEFAULT_JUMPS = 1;
const VERTICAL_SPEED = -10;

type Props = {
  maxJumps?: number;
};

export const JumpController = ({ maxJumps = DEFAULT_JUMPS }: Props) => {
  const jumpsLeft = useRef(maxJumps);
  const { releaseAnimation, requestAnimation } = useAnimationController();

  const onChange = useCallback(
    (isGroundTouched: boolean) => {
      if (isGroundTouched) {
        jumpsLeft.current = maxJumps;
      }
    },
    [maxJumps],
  );

  const { body } = useBody();
  useGroundTouch(onChange);

  const WCb = useCallback(() => {
    if (!body || jumpsLeft.current <= 0 || body.velocity.y > EPS) return;
    applyForce(body, body.velocity.x, VERTICAL_SPEED);
    requestAnimation({
      name: AnimationList.Jump,
      onFinish: () => releaseAnimation(AnimationList.Jump),
    });
    jumpsLeft.current -= 1;
  }, [body, releaseAnimation, requestAnimation]);

  useControlKey('KeyW', WCb);
  useControlKey('Space', WCb);
  return null;
};
