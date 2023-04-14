import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Body } from 'matter-js';
import { useGlobalViewportShaking } from '../GlobalViewport/hooks';
import { getRandowmTrashComponents } from '../trashes/utils';
import { Monster, Props as MonsterProps } from '.';
import { ONE_CIRCLE_IN_RAD } from '../../constants';

const TRASH_AMOUNT = 3;
const SHIFT_MULTIPLIER = 50;
const TRASH_ANIMATION_STEP = 0.2;

export const MonsterWithTrash = ({ x, y }: MonsterProps) => {
  const [isKilled, setKilled] = useState(false);
  const [trashAnimationState, setTrashAnimationStep] = useState(0);

  const trashPositionRef = useRef({ x, y });
  const shakeViewport = useGlobalViewportShaking();
  const randomTrashTypes = useMemo(() => getRandowmTrashComponents(TRASH_AMOUNT), []);

  const onDeath = useCallback(
    (body?: Body) => {
      if (body) trashPositionRef.current = body.position;

      setKilled(true);
      shakeViewport();
      const cb = () =>
        setTimeout(() => {
          setTrashAnimationStep((val) => {
            if (val + TRASH_ANIMATION_STEP > 1) return val;

            cb();
            return val + TRASH_ANIMATION_STEP;
          });
        }, 10);
      cb();
    },
    [shakeViewport],
  );

  if (!isKilled) {
    return <Monster x={x} y={y} onDeath={onDeath} />;
  }

  return (
    <>
      {randomTrashTypes.map((Component, index, arr) => (
        <Component
          key={index}
          x={
            trashPositionRef.current.x +
            Math.cos((ONE_CIRCLE_IN_RAD / arr.length) * (index + 1)) *
            SHIFT_MULTIPLIER *
            trashAnimationState
          }
          y={
            trashPositionRef.current.y +
            Math.sin((ONE_CIRCLE_IN_RAD / arr.length) * (index + 1)) *
            SHIFT_MULTIPLIER *
            trashAnimationState
          }
        />
      ))}
    </>
  );
};
