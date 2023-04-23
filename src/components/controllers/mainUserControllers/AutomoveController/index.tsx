import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTick } from '@pixi/react';

import { useBody } from '../../../Body/context';
import { applyForce } from '../../../Body/utils';
import { AnimationList, useAnimationController } from '../../AnimationController/context';
import { setDirection } from '../../../../redux/mainUser';
import { Directions } from '../../../Bullet/controller';
import {
  selectPageGamePauseState,
  selectPageGameSpeedMultCalculated,
} from '../../../../redux/gamePage/selectors';
import { selectMainUserStoppedState } from '../../../../redux/mainUser/selectors';

const HORIZONTAL_SPEED = 5;
const MAX_SPEED = 15;

export const AutomoveController = () => {
  const { body } = useBody();
  const { releaseAnimation, requestAnimation } = useAnimationController();
  const horizontalSpeed = useSelector(selectPageGameSpeedMultCalculated(HORIZONTAL_SPEED));
  const isPaused = useSelector(selectPageGamePauseState);
  const isStopped = useSelector(selectMainUserStoppedState);
  const dispatch = useDispatch();
  const isRequested = useRef(false);
  const deltaRef = useRef(0);

  useTick((delta) => {
    if (isPaused || isStopped) return;

    deltaRef.current += delta;

    if (deltaRef.current > 5) return;

    deltaRef.current = 0;

    if (body.velocity.x < MAX_SPEED) applyForce(body, horizontalSpeed, body.velocity.y);

    if (body.velocity.x >= horizontalSpeed && !isRequested.current) {
      isRequested.current = true;
      dispatch(setDirection(Directions.Right));
      requestAnimation({ name: AnimationList.Run });
    }

    if (body.velocity.x < HORIZONTAL_SPEED && isRequested.current) {
      releaseAnimation(AnimationList.Run);
    }
  });

  return null;
};
