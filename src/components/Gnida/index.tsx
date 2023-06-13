import React from 'react';
import { Body } from '../Body';
import { AnimatedSpriteController } from '../controllers/AnimatedSpriteController';
import { AnimationController } from '../controllers/AnimationController';
import { AnimationList } from '../controllers/AnimationController/context';
import { GnidaTouchController } from './onTouchController';
import { Filters } from '../../constants';

const GNIDA_PARAMS: Matter.IChamferableBodyDefinition = {
  isSensor: true,
  isStatic: true,
};

const FILTERS = [Filters.SHADOW_FILTER];
const GNIDA_HEIGHT = 190;
const GNIDA_WIDTH = 190;
const GNIDA_SPRITESHEER = '/gnida/gnida.json';
const animationMap = {
  [AnimationList.Idle]: { name: 'idle', speed: 0.07, loop: true, priority: 1 },
  [AnimationList.Run]: { name: 'goes', speed: 0.07, loop: true, priority: 2 },
};

type Props = {
  x: number;
  y: number;
  onCollision?: (cb: () => void) => void;
};

export const Gnida = ({ x, y, onCollision }: Props) => {
  return (
    <Body
      x={x + GNIDA_WIDTH / 2}
      y={y - GNIDA_HEIGHT / 1.2}
      height={GNIDA_HEIGHT}
      width={GNIDA_WIDTH}
      options={GNIDA_PARAMS}
    >
      <AnimatedSpriteController
        ignoreRotation
        width={GNIDA_WIDTH}
        height={GNIDA_HEIGHT}
        spritesheet={GNIDA_SPRITESHEER}
        animationSpeed={0.07}
        setDefault
        zIndex={100}
        filters={FILTERS}
      >
        <AnimationController animationParams={animationMap}>
          <GnidaTouchController onCollision={onCollision} />
        </AnimationController>
      </AnimatedSpriteController>
    </Body>
  );
};
