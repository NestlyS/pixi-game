import React from 'react';
import { Body } from '../Body';
import { AnimatedSpriteController } from '../controllers/AnimatedSpriteController';
import { AnimationController } from '../controllers/AnimationController';
import { AnimationList } from '../controllers/AnimationController/context';
import { HealerTouchController } from './onTouchController';
import { Filters } from '../../constants';

const HEALER_PARAMS: Matter.IChamferableBodyDefinition = {
  isSensor: true,
  isStatic: true,
};

const FILTERS = [Filters.BLACK_OUTLINE_FILTER, Filters.GREEN_OUTLINE_FILTER, Filters.SHADOW_FILTER];
const HEALER_HEIGHT = 190;
const HEALER_WIDTH = 190;
const HEALER_SPRITESHEER = '/healer/healer.json';
const animationMap = {
  [AnimationList.Idle]: { name: 'expectation', speed: 0.07, loop: true, priority: 1 },
  [AnimationList.Heal]: { name: 'end', speed: 0.07, loop: true, priority: 2 },
};

type Props = {
  x: number;
  y: number;
};

export const Healer = ({ x, y }: Props) => {
  return (
    <Body
      x={x + HEALER_WIDTH / 2}
      y={y - HEALER_HEIGHT / 1.2}
      height={HEALER_HEIGHT - 30}
      width={HEALER_WIDTH / 2}
      options={HEALER_PARAMS}
    >
      <AnimatedSpriteController
        ignoreRotation
        width={HEALER_WIDTH}
        height={HEALER_HEIGHT}
        spritesheet={HEALER_SPRITESHEER}
        animationSpeed={0.07}
        setDefault
        zIndex={100}
        filters={FILTERS}
      >
        <AnimationController animationParams={animationMap}>
          <HealerTouchController />
        </AnimationController>
      </AnimatedSpriteController>
    </Body>
  );
};
