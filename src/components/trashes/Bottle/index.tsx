import React, { memo } from 'react';
import { Trash } from '../Base';

const SPRITESHEET_URL = './sprites/atlas.json';
const ANIMATION_NAME = 'bottle';

type Props = {
  x: number;
  y: number;
  isUncollectable?: boolean;
};

export const Bottle = memo(({ x, y, isUncollectable }: Props) => {
  return (
    <Trash
      x={x}
      y={y}
      spritesheetUrl={SPRITESHEET_URL}
      animationName={ANIMATION_NAME}
      type="bottle"
      isUncollectable={isUncollectable}
    />
  );
});
