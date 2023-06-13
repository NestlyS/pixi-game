import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Text, useApp } from '@pixi/react';
import { TextMetrics } from 'pixi.js';

import { COLORS, Filters } from '../../../constants';
import {
  selectAppControllerWidth,
  selectAppControllerScale,
} from '../../../redux/appController/selectors';
import { useFont } from '../../../utils/useFont';
import {
  selectTextBlockCoords,
  selectTextBlockText,
  selectTextBlockVisiblity,
} from '../../../redux/textBlockController/selectors';
import { resetBlock } from '../../../redux/textBlockController';
import { UIContainer } from '../UIContrainer';

const BLOCK_RADIUS = 10;
const FILTERS = [Filters.COLOR_GRADIENT_FILTER, Filters.SHADOW_FILTER];
const TEXT_PADDING = 15;

export const HintBox = () => {
  const app = useApp();
  const dispatch = useDispatch();

  const width = useSelector(selectAppControllerWidth);
  const scale = useSelector(selectAppControllerScale);

  const text = useSelector(selectTextBlockText);
  const { x, y } = useSelector(selectTextBlockCoords);
  const isVisible = useSelector(selectTextBlockVisiblity);
  const visibilityRef = useRef(isVisible);
  visibilityRef.current = isVisible;

  const calculatedWidth = width * 0.25;
  const fontSize = 9 * scale;

  const fontStyle = useFont({
    fill: [COLORS.HintBlockOutline],
    align: 'left',
    strokeThickness: fontSize / 4,
    wordWrap: true,
    wordWrapWidth: calculatedWidth - TEXT_PADDING * 2,
    fontSize,
  });

  const calculatedHeight = useMemo(() => {
    const metrics = TextMetrics.measureText(text, fontStyle);
    return metrics.height + TEXT_PADDING * 2;
  }, [fontStyle, text]);

  const onClick = useCallback(() => {
    dispatch(resetBlock());
  }, [dispatch]);

  useEffect(() => {
    app.stage.addListener('pointerdown', () => {
      if (!visibilityRef.current) return;

      dispatch(resetBlock());
    });
  }, [app.stage, dispatch]);

  if (!isVisible) return null;

  return (
    <Container x={x} y={y}>
      <UIContainer
        x={0}
        y={0}
        borderRadius={BLOCK_RADIUS}
        width={calculatedWidth}
        height={calculatedHeight}
        filters={FILTERS}
        onClick={onClick}
        outlineColor={COLORS.HintBlockOutline}
        backgroundColor={COLORS.HintBlockFill}
      />
      <Text x={TEXT_PADDING} y={TEXT_PADDING} text={text} style={fontStyle} />
    </Container>
  );
};
