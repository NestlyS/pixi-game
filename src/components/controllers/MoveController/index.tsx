import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useControlKey } from '../../../utils/useControlKey';
import { useBody } from '../../Body/context';
import { applyForce } from '../../Body/utils';
import { AnimationList, useAnimationController } from '../AnimationController/context';
import { RUN_LEFT_KEY_CODE, RUN_RIGTH_KEY_CODE } from '../../../constants';
import { selectSettingsPauseState } from '../../../redux/settings/selectors';
import { setDirection } from '../../../redux/mainUser';
import { Directions } from '../../Bullet/controller';

const HORIZONTAL_SPEED = 5;
const MAX_SPEED = 7;

export const MoveController = () => {
  const { body } = useBody();
  const { releaseAnimation, requestAnimation } = useAnimationController();
  const isPaused = useSelector(selectSettingsPauseState);
  const dispatch = useDispatch();
  const isRequested = useRef(false);

  const DCb = useCallback(() => {
    if (!body || body.velocity.x > MAX_SPEED || isPaused) return;
    applyForce(body, HORIZONTAL_SPEED, body.velocity.y);
    if (!isRequested.current) {
      requestAnimation({ name: AnimationList.Run });
      isRequested.current = true;
      dispatch(setDirection(Directions.Right));
    }
  }, [body, isPaused, requestAnimation]);

  const ACb = useCallback(() => {
    if (!body || body.velocity.x < -MAX_SPEED || isPaused) return;
    applyForce(body, -HORIZONTAL_SPEED, body.velocity.y);
    if (!isRequested.current) {
      requestAnimation({ name: AnimationList.Run });
      isRequested.current = true;
      dispatch(setDirection(Directions.Left));
    }
  }, [body, isPaused, requestAnimation]);

  const onUnpress = useCallback(() => {
    releaseAnimation(AnimationList.Run);
    isRequested.current = false;
  }, [releaseAnimation]);

  useControlKey(RUN_RIGTH_KEY_CODE, DCb, onUnpress);

  useControlKey(RUN_LEFT_KEY_CODE, ACb, onUnpress);

  return null;
};
