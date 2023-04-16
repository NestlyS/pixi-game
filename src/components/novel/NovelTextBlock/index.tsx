import { Container, Graphics, Text } from '@pixi/react';
import { ColorGradientFilter } from 'pixi-filters';
import { Graphics as PIXI_Graphics, TextStyle } from 'pixi.js';
import React, { useCallback, useMemo } from 'react';

import {
  BIG_NOVEL_FONT,
  MAIN_FONT_NAME,
  SHADOW_FILTER,
  UI_OUTLINE_COLOR,
  UI_OUTLINE_FILTER,
} from '../../../constants';
import { useScreenWidth } from '../../../utils/useScreenWidth';
import { useScreenHeight } from '../../../utils/useScreenHeight';
import { LazyText } from '../LazyText';

const BLOCK_RADIUS = 25;
const PRIMARY_COLOR = 0xffe0bc;
const SECONDARY_COLOR = 0xffc4b3;

const TEXT_PADDING = 30;

const COLOR_GRADIENT_FILTER = new ColorGradientFilter({
  type: ColorGradientFilter.LINEAR,
  stops: [
    { offset: 0.5, color: PRIMARY_COLOR, alpha: 0 },
    { offset: 1.0, color: SECONDARY_COLOR, alpha: 1 },
  ],
  angle: 180,
  alpha: 0.7,
});

type Props = {
  x: number;
  y: number;
  name: string;
  text: string;
};

export const NovelTextBlock = React.memo(({ x, y, name, text }: Props) => {
  const width = useScreenWidth();
  const height = useScreenHeight();
  const calculatedWidth = width / 2;
  const calculatedHeight = height / 3.5;

  const mainBlockDraw = useCallback(
    (draw: PIXI_Graphics) =>
      draw
        .clear()
        .beginFill(PRIMARY_COLOR, 1)
        .drawRoundedRect(0, 0, calculatedWidth, calculatedHeight, BLOCK_RADIUS)
        .endFill(),
    [x, y, calculatedHeight, calculatedWidth],
  );

  const NOVEL_FONT = useMemo(
    () =>
      new TextStyle({
        fontFamily: MAIN_FONT_NAME,
        align: 'left',
        fill: [UI_OUTLINE_COLOR],
        stroke: '#ffffff',
        strokeThickness: 5,
        letterSpacing: 5,
        wordWrap: true,
        wordWrapWidth: calculatedWidth - TEXT_PADDING,
        fontSize: 17,
      }),
    [],
  );

  return (
    <Container x={x} y={y}>
      <Graphics
        draw={mainBlockDraw}
        filters={[COLOR_GRADIENT_FILTER, UI_OUTLINE_FILTER, SHADOW_FILTER]}
      />
      <Text x={-30} y={-30} text={name} style={BIG_NOVEL_FONT} />
      <LazyText interval={100} x={TEXT_PADDING} y={20} text={text} style={NOVEL_FONT} />
    </Container>
  );
});
