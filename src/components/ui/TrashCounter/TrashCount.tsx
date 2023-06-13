import { memo, useEffect, useRef, useState } from 'react';
import { TextStyle } from 'pixi.js';
import { Text } from '@pixi/react';
import { Sprite } from '../../Sprite';
import { useSlowerTick } from '../../../utils/useSlowedTick';

const ANIMATION_TIMEOUT = 300;
const DELTA = 3;
const ROTATION_AMPLITUDE = 0.15;
const ROTATION_MULT = 0.2;

const getRotation = (() => {
  let scale: 1 | -1 = 1;

  return (rotation: number) => {
    if (rotation > ROTATION_AMPLITUDE) {
      scale = -1;
    }

    if (rotation < -ROTATION_AMPLITUDE) {
      scale = 1;
    }

    return rotation + ROTATION_MULT * scale;
  };
})();

const ANCHOR = { x: 0.5, y: 0.5 };

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  spritesheetUrl: string;
  textureUrl: string;
  fontStyle: TextStyle;
  count: string | number;
};

export const TrashCount = memo(
  ({ x, y, width, height, spritesheetUrl, textureUrl, fontStyle, count }: Props) => {
    const [rotation, setRotation] = useState(0);
    const isAnimatedRef = useRef(false);

    useEffect(() => {
      isAnimatedRef.current = true;
      const id = setTimeout(() => (isAnimatedRef.current = false), ANIMATION_TIMEOUT);
      return () => clearTimeout(id);
    }, [count]);

    useSlowerTick(() => {
      if (!isAnimatedRef.current && rotation === 0) return;
      if (!isAnimatedRef.current) return setRotation(0);
      setRotation(getRotation(rotation));
    }, DELTA);

    return (
      <>
        <Sprite
          x={x + width / 2}
          y={y + height / 2 + rotation * 30}
          pixelised
          spritesheet={spritesheetUrl}
          textureUrl={textureUrl}
          height={height}
          width={width}
          zIndex={10}
          rotation={rotation}
          anchor={ANCHOR}
        />
        <Text x={x + width * 1.2} y={y + 10} text={String(count)} style={fontStyle} zIndex={10} />
      </>
    );
  },
);
