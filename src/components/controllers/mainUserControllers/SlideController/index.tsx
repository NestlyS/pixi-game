import { Body } from 'matter-js';
import { Container } from 'pixi.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useControlKey } from '../../../../utils/useControlKey';
import { useBody } from '../../../Body/context';
import { BODY_FRICTION } from '../../../Controllable';
import { AnimationList, useAnimationController } from '../../AnimationController/context';
import { useAttackingAnimation } from '../AttackController/context';
import { useGroundTouch } from '../../GroundTouchController/context';
import { useContainer } from '../../ViewController/context';
import { SLIDE_KEY_CODE, SLIDE_KEY_CODE_EXTRA } from '../../../../constants';
import { SoundTypes, Sounds, playSound } from '../../../../utils/soundController';
import { selectMainUserHurtedState } from '../../../../redux/mainUser/selectors';
import { moveSpriteCenter, returnSpriteCenter } from './utils';

export const SLIDING_FRICTION = 0.001;

type Props = {
  cooldown: number;
};

export const SlideController = ({ cooldown }: Props) => {
  const { body } = useBody();
  const isAttack = useAttackingAnimation();
  const isGroundTouchedRef = useRef(false);
  const onChange = useCallback((isTouched: boolean) => {
    isGroundTouchedRef.current = isTouched;
  }, []);

  const { requestAnimation, releaseAnimation } = useAnimationController();

  const container = useContainer<Container>();
  const isHurted = useSelector(selectMainUserHurtedState);
  useGroundTouch(onChange);

  const [isSliding, setSliding] = useState(false);
  const slidingRef = useRef(false);

  const isUnsladed = isAttack || isHurted;

  const unpressCb = useCallback(() => {
    if (!body || !container?.children || !slidingRef.current) return;
    slidingRef.current = false;
    setSliding(false);
    const bodyWidth = body.bounds.max.x - body.bounds.min.x;
    const bodyNewY = body.bounds.max.y - bodyWidth / 2;

    returnSpriteCenter(container);
    Body.setAngle(body, 0);
    Body.setPosition(body, { x: body.position.x, y: bodyNewY });
    Body.setInertia(body, Infinity);
    body.friction = BODY_FRICTION;
  }, [body, container]);

  const SCb = useCallback(() => {
    if (
      !body ||
      !container?.children ||
      !isGroundTouchedRef.current ||
      slidingRef.current ||
      isUnsladed
    )
      return;
    const bodyWidth = body.bounds.max.x - body.bounds.min.x;
    const bodyNewY = body.bounds.max.y - bodyWidth / 2;

    slidingRef.current = true;

    moveSpriteCenter(container, bodyWidth * 0.2);
    Body.setAngle(body, 1.5708);
    Body.setPosition(body, { x: body.position.x, y: bodyNewY });
    Body.setInertia(body, Infinity);
    body.friction = SLIDING_FRICTION;
    playSound(Sounds.Slide);

    setSliding(true);
    setTimeout(() => unpressCb(), cooldown);
  }, [body, container, cooldown, isUnsladed, unpressCb]);

  useControlKey(SLIDE_KEY_CODE, SCb);
  useControlKey(SLIDE_KEY_CODE_EXTRA, SCb);

  useEffect(() => {
    if ((isUnsladed || isHurted) && slidingRef.current) unpressCb();
  }, [isHurted, isUnsladed, unpressCb]);

  useEffect(() => {
    if (isSliding) {
      requestAnimation({ name: AnimationList.Slide });
      return;
    }

    releaseAnimation(AnimationList.Slide);
  }, [isSliding, releaseAnimation, requestAnimation]);

  return null;
};
