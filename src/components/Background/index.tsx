import { useTick } from '@pixi/react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { WORLD_HEIGHT, WORLD_WIDTH } from '../../App';
import { Sprite } from '../Sprite';
import { selectSettingsPauseState } from '../../redux/settings/selectors';
import { useGlobalViewport } from '../GlobalViewport/context';
import { EPS } from '../../constants';

const DELTA = 5;

export const Background = () => {
  const [x, setX] = useState(0);
  const deltaRef = useRef(0);
  const isPaused = useSelector(selectSettingsPauseState);
  const viewport = useGlobalViewport();
  const prevX = useRef(0);

  useTick((delta) => {
    deltaRef.current += delta;

    if (isPaused || deltaRef.current < DELTA || !viewport.globalViewport?.x) return;

    deltaRef.current = 0;

    const raw = viewport.globalViewport.x - prevX.current;

    if (raw === 0 || Math.abs(raw) < EPS) return;

    const transition = Math.sign(raw);
    prevX.current = viewport.globalViewport.x;

    if (x <= -WORLD_WIDTH || x >= WORLD_WIDTH) return setX(0);

    setX((state) => state + transition);
  });

  return (
    <>
      <Sprite
        x={x - WORLD_WIDTH}
        y={0}
        height={WORLD_HEIGHT}
        width={WORLD_WIDTH}
        spritesheet="./sprites/backround.json"
        textureUrl="backgroung3.png"
        zIndex={0}
        pixelised
      />
      <Sprite
        x={x}
        y={0}
        height={WORLD_HEIGHT}
        width={WORLD_WIDTH}
        spritesheet="./sprites/backround.json"
        textureUrl="backgroung3.png"
        zIndex={0}
        pixelised
      />
      <Sprite
        x={x + WORLD_WIDTH}
        y={0}
        height={WORLD_HEIGHT}
        width={WORLD_WIDTH}
        spritesheet="./sprites/backround.json"
        textureUrl="backgroung3.png"
        zIndex={0}
        pixelised
      />
    </>
  );
};
