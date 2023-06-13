import React from 'react';
import { Text } from '@pixi/react';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../../../../../../constants';
import { selectPageGameDistance } from '../../../../../../../../redux/gamePage/selectors';
import { useFont } from '../../../../../../../../utils/useFont';
import { selectAppControllerWidth } from '../../../../../../../../redux/appController/selectors';

type Props = {
  x: number;
  y: number;
};

export const DistanceShower = ({ x, y }: Props) => {
  const width = useSelector(selectAppControllerWidth);
  const distance = useSelector(selectPageGameDistance);
  const distValue = String(distance);

  const fontSize = width * 0.02;
  const letterSpacing = 5;

  const fontStyle = useFont({
    fontSize: fontSize,
    strokeThickness: fontSize * 0.3,
    letterSpacing: letterSpacing,
    fill: [COLORS.White],
    stroke: COLORS.UIOutline,
  });

  return (
    <Text
      x={x - (fontSize + letterSpacing) * distValue.length}
      y={y}
      text={distValue}
      style={fontStyle}
    />
  );
};
