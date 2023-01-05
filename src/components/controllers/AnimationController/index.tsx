import { useTick } from '@inlet/react-pixi';
import React, { useEffect, useRef } from 'react'
import { EPS } from '../../../constants';
import { useAnimation } from '../../AnimatedSprite/context';
import { useBodyParams } from '../../Body/context'

const X_IDLE_BORDER = EPS * 50;
const Y_IDLE_BORDER = EPS * 100;

const enum AnimationList {
  Idle = 'adventurer-idle',
  Run = 'adventurer-run',
  Fall = 'adventurer-fall',
  Jump = 'adventurer-jump',
  SmrSlt = 'adventurer-smrslt',
}

export const AnimationController = () => {
  const {
    body,
    vx,
    vy
  } = useBodyParams();

  const {
    animations,
    setAnimation,
  } = useAnimation();

  const lastAnim = useRef<AnimationList | null>(null);

  useEffect(() => {
    setAnimation(AnimationList.Idle);
  }, [setAnimation]);

  useTick(() => {
    if (!body) {
      return;
    }

    /* if (lastAnim.current !== AnimationList.SmrSlt && vy < EPS * 10 && vy > 0) {
      console.log(body.velocity.y, vy, 'smt')
      setAnimation(AnimationList.SmrSlt);
      lastAnim.current = AnimationList.SmrSlt;
      return;
    } */

    if (lastAnim.current !== AnimationList.Idle && Math.abs(vx) < X_IDLE_BORDER && Math.abs(vy) < Y_IDLE_BORDER) {
      setAnimation(AnimationList.Idle);
      // Венсти в useAnimation
      lastAnim.current = AnimationList.Idle;
      return;
    }

    if (lastAnim.current !== AnimationList.Fall && vy > Y_IDLE_BORDER) {
      console.log(body.velocity.y, vy, 'fall')
      setAnimation(AnimationList.Fall);
      lastAnim.current = AnimationList.Fall;
      return;
    }

    if (lastAnim.current !== AnimationList.Jump && vy < -Y_IDLE_BORDER) {
      console.log(body.velocity.y, vy, 'JUMP')
      setAnimation(AnimationList.Jump);
      lastAnim.current = AnimationList.Jump;
      return;
    }

    if (lastAnim.current !== AnimationList.Run && Math.abs(vx) > X_IDLE_BORDER && Math.abs(vy) < Y_IDLE_BORDER) {
      setAnimation(AnimationList.Run);
      lastAnim.current = AnimationList.Run;
      return;
    }
  });

  return null;
}
