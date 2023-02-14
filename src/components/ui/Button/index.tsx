import { _ReactPixi } from '@inlet/react-pixi';
import { Texture } from 'pixi.js';
import React, { useCallback, useMemo } from 'react';
import { Sprite } from '../../Sprite';

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  spritesheetUrl: string;
  textureUrl: string;
  pixelised?: boolean;
  onClick?: () => void;
};

export const Button = ({
  x,
  y,
  width,
  height,
  spritesheetUrl,
  textureUrl,
  pixelised = false,
  onClick,
}: Props) => (
  <Sprite
    x={x}
    y={y}
    pointertap={onClick}
    width={width}
    height={height}
    spritesheet={spritesheetUrl}
    textureUrl={textureUrl}
    interactive
    buttonMode
    pixelised={pixelised}
  />
);
