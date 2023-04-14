import { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useControlKey } from '../../../utils/useControlKey';
import { useBody } from '../../Body/context';
import { applyForce } from '../../Body/utils';
import { AnimationList, useAnimationController } from '../AnimationController/context';
import { RUN_LEFT_KEY_CODE, RUN_RIGTH_KEY_CODE } from '../../../constants';
import { selectSettingsPauseState } from '../../../redux/settings/selectors';

const HORIZONTAL_SPEED = 5;
const MAX_SPEED = 7;

export const MoveController = () => {
  const { body } = useBody();
  const { releaseAnimation, requestAnimation } = useAnimationController();
  const isPaused = useSelector(selectSettingsPauseState);
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

  useControlKey(RUN_RIGTH_KEY_CODE, DCb, onUnpress);

  useControlKey(RUN_LEFT_KEY_CODE, ACb, onUnpress);

  return null;
};
