import React from 'react';
import { Button, Props as ButtonProps } from '../Button';
import { Sprite } from '../../Sprite';

export type Props = {
  children?: string;
  marginLeft?: number;
  marginTop?: number;
  spriteUrl: string;
  spritesheetUrl: string;
} & ButtonProps;

export const ButtonWithSprite = React.memo(
  ({
    x,
    y,
    width,
    height,
    spriteUrl,
    spritesheetUrl,
    marginLeft = 0,
    marginTop = 0,
    ...props
  }: Props) => (
    <Button x={x} y={y} width={width} height={height} spritesheetUrl={spritesheetUrl} {...props}>
      <Sprite
        x={marginLeft}
        y={marginTop}
        width={width - marginLeft * 2}
        height={height - marginTop * 2}
        textureUrl={spriteUrl}
        spritesheet={spritesheetUrl}
      />
    </Button>
  ),
);
