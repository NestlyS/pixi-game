import { Container, useTick } from '@inlet/react-pixi';
import { useRef, useState } from 'react';
import { WORLD_HEIGHT, WORLD_WIDTH } from '../../App';
import { Sprite } from '../Sprite';

const DELTA = 10;

export const Background = () => {
  const [x, setX] = useState(0);
  const deltaRef = useRef(0);

  useTick((delta) => {
    deltaRef.current += delta;

    if (deltaRef.current < DELTA) return;

    deltaRef.current = 0;

    if (x <= -WORLD_WIDTH) return setX(0);

    setX((state) => state - 1);
  });

  return (
    <>
      <Sprite
        x={x}
        y={0}
        height={WORLD_HEIGHT}
        width={WORLD_WIDTH}
        spritesheet="./sprites/backround.json"
        textureUrl="backgroung2.png"
        zIndex={0}
        pixelised
      />
      <Sprite
        x={x + WORLD_WIDTH}
        y={0}
        height={WORLD_HEIGHT}
        width={WORLD_WIDTH}
        spritesheet="./sprites/backround.json"
        textureUrl="backgroung2.png"
        zIndex={0}
        pixelised
      />
    </>
  );
};
