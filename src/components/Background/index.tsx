import { useTick } from '@pixi/react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Sprite } from '../Sprite';
import { useGlobalViewport } from '../GlobalViewport/context';
import { EPS } from '../../constants';
import {
  selectAppControllerWidth,
  selectAppControllerHeight,
} from '../../redux/appController/selectors';
import { selectPageGamePauseState } from '../../redux/gamePage/selectors';

const DELTA = 5;

export const Background = () => {
  const [x, setX] = useState(0);
  const deltaRef = useRef(0);
  const isPaused = useSelector(selectPageGamePauseState);
  const width = useSelector(selectAppControllerWidth);
  const height = useSelector(selectAppControllerHeight);
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

    if (x <= -width || x >= width) return setX(0);

    setX((state) => state + transition);
  });

  return (
    <>
      <Sprite
        x={x - width}
        y={0}
        height={height}
        width={width}
        spritesheet="./sprites/backround.json"
        textureUrl="backgroung3.png"
        zIndex={0}
        pixelised
      />
      <Sprite
        x={x}
        y={0}
        height={height}
        width={width}
        spritesheet="./sprites/backround.json"
        textureUrl="backgroung3.png"
        zIndex={0}
        pixelised
      />
      <Sprite
        x={x + width}
        y={0}
        height={height}
        width={width}
        spritesheet="./sprites/backround.json"
        textureUrl="backgroung3.png"
        zIndex={0}
        pixelised
      />
    </>
  );
};
