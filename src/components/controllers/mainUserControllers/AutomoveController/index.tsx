import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useBody } from '../../../Body/context';
import { applyForce } from '../../../Body/utils';
import { AnimationList, useAnimationController } from '../../AnimationController/context';
import { setDirection } from '../../../../redux/mainUser';
import { Directions } from '../../../Bullet/controller';
import {
  selectPageGamePauseState,
  selectPageGameSpeedMultCalculated,
} from '../../../../redux/gamePage/selectors';
import {
  selectMainUserHurtedState,
  selectMainUserStoppedState,
} from '../../../../redux/mainUser/selectors';
import { useSlowerTick } from '../../../../utils/useSlowedTick';

const HORIZONTAL_SPEED = 5;
const MAX_SPEED = 15;
const DELTA = 5;

export const AutomoveController = () => {
  const { body } = useBody();
  const { releaseAnimation, requestAnimation } = useAnimationController();
  const horizontalSpeed = useSelector(selectPageGameSpeedMultCalculated(HORIZONTAL_SPEED));
  const isPaused = useSelector(selectPageGamePauseState);
  const isHurted = useSelector(selectMainUserHurtedState);
  const isStopped = useSelector(selectMainUserStoppedState);
  const dispatch = useDispatch();
  const isRequested = useRef(false);

  useSlowerTick(() => {
    if (isPaused || isHurted || isStopped) return;

    if (body.velocity.x < MAX_SPEED) applyForce(body, horizontalSpeed, body.velocity.y);

    if (body.velocity.x >= horizontalSpeed && !isRequested.current) {
      isRequested.current = true;
      dispatch(setDirection(Directions.Right));
      requestAnimation({ name: AnimationList.Run });
    }

    if (body.velocity.x < HORIZONTAL_SPEED && isRequested.current) {
      releaseAnimation(AnimationList.Run);
    }
  }, DELTA);

  return null;
};
