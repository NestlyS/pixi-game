import { TextStyle } from 'pixi.js';
import { Container, Text } from '@inlet/react-pixi';
import React from 'react';
import { Button } from '../Button';

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  spritesheetUrl: string;
  textureUrl: string;
  fontStyle: TextStyle;
  onClick?: () => void;
  children?: string;
  marginLeft?: number;
  marginTop?: number;
};

export const ButtonWithText = ({
  x,
  y,
  width,
  height,
  spritesheetUrl,
  textureUrl,
  fontStyle,
  children,
  marginLeft = 0,
  marginTop = 0,
}: Props) => {
  return (
    // @ts-ignore
    <Container x={x} y={y}>
      <Button
        spritesheetUrl={spritesheetUrl}
        width={width}
        height={height}
        x={0}
        y={0}
        textureUrl={textureUrl}
        pixelised
      />
      <Text
        x={marginLeft}
        y={marginTop}
        text={children}
        style={fontStyle}
      />
    </Container>
  );
};
