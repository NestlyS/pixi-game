import { Graphics, Container } from '@pixi/react';
import { Graphics as PIXI_Graphics } from 'pixi.js';
import React, { useCallback, useMemo } from 'react';
import { Filters, COLORS } from '../../../constants';
import { useLowGraphic } from '../../../utils/useLowGraphic';

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius?: number;
  onClick?: () => void;
  onHover?: () => void;
  onHoverOut?: () => void;
  onHoverOutOutside?: () => void;
  backgroundColor?: COLORS;
  outlineColor?: COLORS;
  filters?: Filters[];
  noBackground?: boolean;
};

export const UIContainer = React.memo(
  ({
    x,
    y,
    width,
    height,
    borderRadius = 0,
    onClick,
    onHover,
    onHoverOut,
    onHoverOutOutside,
    backgroundColor = COLORS.TextBlockFill,
    outlineColor = COLORS.UIOutline,
    filters = [],
    noBackground = false,
  }: Props) => {
    const _filters = useLowGraphic(filters);
    const alpha = noBackground ? 0 : 1;
    const hitArea = useMemo(
      () => ({
        contains: (_x: number, _y: number) =>
          _x >= x && _x <= x + width && _y >= y && _y <= y + height,
      }),
      [height, width, x, y],
    );

    const bodyDraw = useCallback(
      (draw: PIXI_Graphics) =>
        draw
          .clear()
          .lineStyle(3, outlineColor, alpha)
          .beginFill(backgroundColor, alpha)
          .drawRoundedRect(0, 0, width, height, borderRadius)
          .endFill(),
      [outlineColor, alpha, backgroundColor, width, height, borderRadius],
    );

    return (
      <Container x={x} y={y}>
        <Graphics
          draw={bodyDraw}
          interactive={Boolean(onClick || onHover || onHoverOut || onHoverOutOutside)}
          pointerout={onHoverOutOutside}
          pointertap={onClick}
          pointerdown={onHover}
          pointerup={onHoverOut}
          filters={_filters}
          hitArea={noBackground ? hitArea : undefined}
        />
      </Container>
    );
  },
);
