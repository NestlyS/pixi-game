import { Container, Graphics, Text } from '@pixi/react';
import { Graphics as PIXI_Graphics } from 'pixi.js';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { COLORS, Filters, SKIP_KEY_CODE } from '../../../../constants';
import { LazyText } from '../LazyText';
import {
  selectAppControllerHeight,
  selectAppControllerWidth,
  selectAppControllerScale,
} from '../../../../redux/appController/selectors';
import { useFont } from '../../../../utils/useFont';
import { NextPageButton } from '../NextPageButton';
import { useLowGraphic } from '../../../../utils/useLowGraphic';
import { BLOCK_RADIUS, TEXT_PADDING, NOVEL_INTERVAL } from './contants';
import { getVoiceSoundWithTable } from './utils';

type Props = {
  x: number;
  y: number;
  name: string;
  text: string;
  onEnd: () => void;
  onNextPage?: () => void;
};

/**
- Добавить звуки говорения
- Починить новеллу, довести её до полноценного сюжета
 */

export const NovelTextBlock = React.memo(({ x, y, name, text, onEnd, onNextPage }: Props) => {
  const filters = useLowGraphic([
    Filters.COLOR_GRADIENT_FILTER,
    Filters.UI_OUTLINE_FILTER,
    Filters.SHADOW_FILTER,
  ]);
  const width = useSelector(selectAppControllerWidth);
  const height = useSelector(selectAppControllerHeight);
  const widthScale = useSelector(selectAppControllerScale);
  const [isPageReaded, setPageReaded] = useState(false);

  const calculatedWidth = width * 0.5;
  const calculatedHeight = height * 0.3;

  const mainBlockDraw = useCallback(
    (draw: PIXI_Graphics) =>
      draw
        .clear()
        .beginFill(COLORS.TextBlockFill, 1)
        .drawRoundedRect(0, 0, calculatedWidth, calculatedHeight, BLOCK_RADIUS)
        .endFill(),
    [calculatedWidth, calculatedHeight],
  );

  const BIG_NOVEL_FONT = useFont({
    fill: [COLORS.White],
    stroke: COLORS.UIOutline,
    align: 'left',
    strokeThickness: 5 * widthScale,
    fontSize: 25 * widthScale,
  });

  const NOVEL_FONT = useFont({
    fill: [COLORS.UIOutline],
    stroke: COLORS.White,
    align: 'left',
    strokeThickness: 1.5 * widthScale,
    wordWrap: true,
    wordWrapWidth: calculatedWidth - TEXT_PADDING * 2,
    fontSize: 9 * widthScale,
    lineHeight: 12 * widthScale,
  });

  const onNextChar = useCallback(
    (restChars: string[]) => {
      if (restChars.length === 0) {
        setPageReaded(true);
        onEnd();
      }

      getVoiceSoundWithTable(restChars[0], name);
    },
    [name, onEnd],
  );

  return (
    <Container x={x} y={y}>
      <Graphics draw={mainBlockDraw} filters={filters} />
      <Text
        x={-calculatedWidth * 0.1}
        y={-calculatedHeight * 0.1}
        text={name}
        style={BIG_NOVEL_FONT}
      />
      <LazyText
        interval={NOVEL_INTERVAL}
        x={TEXT_PADDING}
        y={calculatedHeight * 0.2}
        text={text}
        onNextChar={onNextChar}
        style={NOVEL_FONT}
      />
      {isPageReaded && (
        <NextPageButton
          x={calculatedWidth * 0.7}
          y={calculatedHeight * 0.85}
          keyName={SKIP_KEY_CODE}
          onNextPage={onNextPage}
        />
      )}
    </Container>
  );
});
