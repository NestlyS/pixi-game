import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Graphics as PIXI_Graphics } from 'pixi.js';
import { Graphics } from '@pixi/react';

import { Button, Props as ButtonProps } from '../../../Button';

const drawMask = (x: number, y: number, width: number, height: number) =>
  new PIXI_Graphics().clear().beginFill(0xde3249, 0.7).drawRect(x, y, width, height).endFill();

type Props = {
  y: number;
  x: number;
  width: number;
  height: number;
  cooldown: number;
  textureUrl: string;
  spritesheetUrl: string;
  onClick: () => void;
} & ButtonProps;

export const ButtonWithCooldown = memo(
  ({
    y,
    x,
    width,
    height,
    cooldown,
    textureUrl,
    spritesheetUrl,
    onClick,
    ...buttonProps
  }: Props) => {
    const [delta, setDelta] = useState(0);
    const [inited, setInited] = useState(false);
    const mask = useMemo(() => drawMask(x, y, width, height), [x, y, width, height]);

    useEffect(() => {
      if (!cooldown) return;

      setDelta(100);
      setInited(true);
    }, [cooldown]);

    useEffect(() => {
      if (!inited) return;
      const msPerPixels = cooldown / 100;

      const id = setInterval(() => {
        setDelta((val) => {
          if (val <= 0) {
            setInited(false);
            clearInterval(id);
          }
          return val - 1;
        });
      }, msPerPixels);
      return () => clearInterval(id);
    }, [cooldown, inited]);

    const draw = useCallback((g: PIXI_Graphics) => {
      g.clear().beginFill(0xde3249, 0.7).drawRect(0, 0, 100, 100).endFill();
    }, []);

    return (
      <>
        <Button
          x={x}
          y={y}
          onClick={onClick}
          width={width}
          height={height}
          spritesheetUrl={spritesheetUrl}
          textureUrl={textureUrl}
          {...buttonProps}
        />
        <Graphics
          x={x}
          y={y + height - delta}
          width={width}
          height={height}
          draw={draw}
          mask={mask}
        />
      </>
    );
  },
);
