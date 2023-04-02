import { useCallback, useRef } from 'react';
import { useControlKey } from '../../../utils/useControlKey';
import { useBody, useBodyParams } from '../../Body/context';
import { applyForce } from '../../Body/utils';
import { EPS } from '../../../constants';
import { useGroundTouch } from '../GroundTouchController/context';
import { AnimationList, useAnimationController } from '../AnimationController/context';
import { useTick } from '@pixi/react';

const VERTICAL_SPEED = 5;

export const FallController = () => {
  const { body } = useBody();
  const isRequestedAnimation = useRef(false);
  const { releaseAnimation, requestAnimation } = useAnimationController();

  useTick(() => {
    if (body.velocity.y > VERTICAL_SPEED && !isRequestedAnimation.current) {
      requestAnimation({ name: AnimationList.Fall });
      isRequestedAnimation.current = true;
      return;
    }

    if (body.velocity.y <= VERTICAL_SPEED && isRequestedAnimation.current) {
      releaseAnimation(AnimationList.Fall);
      isRequestedAnimation.current = false;
    }
  });
  return null;
};
