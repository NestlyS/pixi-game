import React from 'react';
import { Text } from '@pixi/react';
import { useSelector } from 'react-redux';
import { selectPageGameDistance } from '../../../../../redux/gamePage/selectors';
import { COLORS } from '../../../../../constants';
import { useFont } from '../../../../../utils/useFont';

const FONT_SIZE = 20;
const LETTER_SPACING = 5;

type Props = {
  x: number;
  y: number;
};

export const DistanceShower = ({ x, y }: Props) => {
  const distance = useSelector(selectPageGameDistance);
  const distValue = String(distance);

  const fontStyle = useFont({
    fontSize: FONT_SIZE,
    letterSpacing: LETTER_SPACING,
    fill: [COLORS.White],
    stroke: COLORS.UIOutline,
  });

  return (
    <Text
      x={x - (FONT_SIZE + LETTER_SPACING) * distValue.length}
      y={y}
      text={distValue}
      style={fontStyle}
    />
  );
};
