import { debounce } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
import { useControlKey } from '../../../utils/useControlKey';
import { useBody } from '../../Body/context';
import { applyForce } from '../../Body/utils';
import { AnimationList, useAnimationController } from '../AnimationController/context';
import { usePausedState } from '../../ui/Settings/context';

const HORIZONTAL_SPEED = 5;
const MAX_SPEED = 7;

export const MoveController = () => {
  const { body } = useBody();
  const { releaseAnimation, requestAnimation } = useAnimationController();
  const isPaused = usePausedState();
  const isRequested = useRef(false);

  const DCb = useCallback(() => {
    if (!body || body.velocity.x > MAX_SPEED || isPaused) return;
    applyForce(body, HORIZONTAL_SPEED, body.velocity.y);
    if (!isRequested.current) {
      requestAnimation({ name: AnimationList.Run });
      isRequested.current = true;
    }
  }, [body, isPaused, requestAnimation]);

  const ACb = useCallback(() => {
    if (!body || body.velocity.x < -MAX_SPEED || isPaused) return;
    applyForce(body, -HORIZONTAL_SPEED, body.velocity.y);
    if (!isRequested.current) {
      requestAnimation({ name: AnimationList.Run });
      isRequested.current = true;
    }
  }, [body, isPaused, requestAnimation]);

  const onUnpress = useCallback(() => {
    releaseAnimation(AnimationList.Run);
    isRequested.current = false;
  }, [releaseAnimation]);

  useControlKey('KeyD', DCb, onUnpress);

  useControlKey('KeyA', ACb, onUnpress);

  return null;
};
