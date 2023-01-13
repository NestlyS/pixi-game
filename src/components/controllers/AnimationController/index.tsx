import { useTick } from '@inlet/react-pixi';
import React, { useCallback, useEffect, useRef } from 'react'
import { EPS } from '../../../constants';
import { useAnimation } from '../../AnimatedSprite/context';
import { useBody, useBodyParams } from '../../Body/context'
import { useGroundTouch } from '../GroundTouchController/context';
import { useBodyHealth } from '../HealthController/context';
import { useSliding } from '../SlideController/context';

const X_IDLE_BORDER = EPS * 50;
const Y_IDLE_BORDER = EPS * 100;

const enum AnimationList {
  Idle = 'idle',
  Run = 'run',
  Fall = 'fall',
  Jump = 'jump',
  Hurt = 'hurt',
  Slide = 'slide',
}

type Props = {
  animationNames: Record<keyof typeof AnimationList, { name: string, speed?: number, loop?: boolean }>,
}

export const AnimationController = ({
  animationNames
}: Props) => {
  const {
    vx,
    vy
  } = useBodyParams();

  const {
    body
  } = useBody();

  const {
    isCooldown
  } = useBodyHealth();
  const isSliding = useSliding();

  const isGroundTouchedRef = useRef(true);
  const onChange = useCallback(
    (isGroundTouched: boolean) => {
      isGroundTouchedRef.current = isGroundTouched;
    },
    [],
  );

  useGroundTouch(onChange);

  const {
    animations,
    setAnimation,
  } = useAnimation();

  const lastAnim = useRef<AnimationList | null>(null);

  useEffect(() => {
    setAnimation(animationNames.Idle);
  }, [animationNames.Idle, setAnimation]);

  useTick(() => {
    if (!body) {
      return;
    }

    if (animationNames.Hurt && lastAnim.current !== AnimationList.Hurt && isCooldown) {
      setAnimation(animationNames.Hurt);
      lastAnim.current = AnimationList.Hurt;
      return;
    }

    if (isCooldown) {
      return;
    }

    if (animationNames.Slide && lastAnim.current !== AnimationList.Slide && isSliding) {
      setAnimation(animationNames.Slide);
      lastAnim.current = AnimationList.Slide;
      return;
    }

    if (isSliding) {
      return;
    }

    if (animationNames.Idle && lastAnim.current !== AnimationList.Idle && isGroundTouchedRef.current && Math.abs(vx) < X_IDLE_BORDER && Math.abs(vy) < Y_IDLE_BORDER) {
      setAnimation(animationNames.Idle);
      // Венсти в useAnimation
      lastAnim.current = AnimationList.Idle;
      return;
    }

    if (animationNames.Fall && lastAnim.current !== AnimationList.Fall && vy > Y_IDLE_BORDER) {
      console.log(body.velocity.y, vy, 'fall')
      setAnimation(animationNames.Fall);
      lastAnim.current = AnimationList.Fall;
      return;
    }

    if (animationNames.Jump && lastAnim.current !== AnimationList.Jump && vy < -Y_IDLE_BORDER) {
      console.log(body.velocity.y, vy, 'JUMP')
      setAnimation(animationNames.Jump);
      lastAnim.current = AnimationList.Jump;
      return;
    }

    if (animationNames.Run && lastAnim.current !== AnimationList.Run && isGroundTouchedRef.current && Math.abs(vx) > X_IDLE_BORDER && Math.abs(vy) < Y_IDLE_BORDER) {
      setAnimation(animationNames.Run);
      lastAnim.current = AnimationList.Run;
      return;
    }
  });

  return null;
}
