import { TextStyle, TextMetrics } from 'pixi.js';
import { Text } from '@pixi/react';
import React, { useMemo } from 'react';
import { Button, Props as ButtonProps } from '../Button';

type Props = {
  fontStyle: TextStyle;
  children?: string;
  marginLeft?: number;
  marginTop?: number;
  width?: number;
} & Omit<ButtonProps, 'width'>;

export const ButtonWithText = React.memo(
  ({
    x,
    y,
    width,
    height,
    spritesheetUrl,
    textureUrl,
    fontStyle,
    children = '',
    pixelised,
    marginLeft = 10,
    marginTop = 10,
    borderRadius,
    backgroundColor,
    outlineColor,
    filters,
    onClick,
  }: Props) => {
    const maxCalculatedTextWidth = useMemo(() => {
      if (width) return width;

      const metrics = TextMetrics.measureText(children, fontStyle);

      return metrics.width ?? marginLeft * 2;
    }, [children, fontStyle, marginLeft, width]);

    return (
      <Button
        spritesheetUrl={spritesheetUrl}
        width={maxCalculatedTextWidth}
        height={height}
        x={x}
        y={y}
        textureUrl={textureUrl}
        pixelised={pixelised}
        onClick={onClick}
        borderRadius={borderRadius}
        outlineColor={outlineColor}
        backgroundColor={backgroundColor}
        filters={filters}
      >
        <Text x={marginLeft} y={marginTop} text={children} style={fontStyle} />
      </Button>
    );
  },
);
