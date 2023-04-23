import { Container, Graphics, Text } from '@pixi/react';
import { ColorGradientFilter } from 'pixi-filters';
import { Graphics as PIXI_Graphics } from 'pixi.js';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BIG_NOVEL_FONT, COLORS, SHADOW_FILTER, UI_OUTLINE_FILTER } from '../../../constants';
import { LazyText } from '../LazyText';
import {
  selectAppControllerHeightScale,
  selectAppControllerWidthScale,
} from '../../../redux/appController/selectors';
import { moveOneCharFromRestToVisibleText, skipAllRestText } from '../../../redux/novelPage';
import { useFont } from '../../../utils/useFont';

const BLOCK_RADIUS = 25;
const PRIMARY_COLOR = 0xffe0bc;
const SECONDARY_COLOR = 0xffc4b3;

const NOVEL_INTERVAL = 50;

const BLOCK_WIDTH = 800;
const BLOCK_HEIGHT = 250;

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
  restText: string;
};

export const NovelTextBlock = React.memo(({ x, y, name, text, restText }: Props) => {
  const widthScale = useSelector(selectAppControllerWidthScale);
  const heightScale = useSelector(selectAppControllerHeightScale);
  const dispatch = useDispatch();

  const calculatedWidth = BLOCK_WIDTH / widthScale;
  const calculatedHeight = BLOCK_HEIGHT / heightScale;

  const mainBlockDraw = useCallback(
    (draw: PIXI_Graphics) =>
      draw
        .clear()
        .beginFill(PRIMARY_COLOR, 1)
        .drawRoundedRect(0, 0, calculatedWidth, calculatedHeight, BLOCK_RADIUS)
        .endFill(),
    [calculatedWidth, calculatedHeight],
  );

  const NOVEL_FONT = useFont({
    fill: [COLORS.UIOutline],
    stroke: COLORS.White,
    align: 'left',
    strokeThickness: 5 / widthScale,
    letterSpacing: 5,
    wordWrap: true,
    wordWrapWidth: calculatedWidth - TEXT_PADDING,
    fontSize: 22 / widthScale,
  });

  const onNextChar = useCallback(() => dispatch(moveOneCharFromRestToVisibleText()), [dispatch]);
  const onSkip = useCallback(
    () => restText.length && dispatch(skipAllRestText()),
    [dispatch, restText.length],
  );

  return (
    <Container x={x} y={y}>
      <Graphics
        draw={mainBlockDraw}
        filters={[COLOR_GRADIENT_FILTER, UI_OUTLINE_FILTER, SHADOW_FILTER]}
      />
      <Text x={-30} y={-30} text={name} style={BIG_NOVEL_FONT} />
      <LazyText
        interval={NOVEL_INTERVAL}
        x={TEXT_PADDING}
        y={20}
        text={text}
        restText={restText}
        onNextChar={onNextChar}
        onSkip={onSkip}
        style={NOVEL_FONT}
      />
    </Container>
  );
});
