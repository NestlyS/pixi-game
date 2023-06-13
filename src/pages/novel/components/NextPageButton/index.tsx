import React from 'react';
import { useSelector } from 'react-redux';
import { Text } from '@pixi/react';
import { COLORS } from '../../../../constants';
import { useFont } from '../../../../utils/useFont';
import { selectAppControllerScale } from '../../../../redux/appController/selectors';

type Props = {
  x: number;
  y: number;
  keyName: string;
  onNextPage?: () => void;
};

export const NextPageButton = React.memo(({ x, y, keyName, onNextPage }: Props) => {
  const widthScale = useSelector(selectAppControllerScale);
  const text = `[${keyName}]`;

  const fontStyle = useFont({
    fill: [COLORS.ChipsFontFill],
    stroke: COLORS.UIOutline,
    align: 'left',
    strokeThickness: 3 * widthScale,
    letterSpacing: 5 * widthScale,
    fontSize: widthScale * 8,
    dropShadow: true,
    dropShadowAlpha: 0.5,
    dropShadowDistance: 2,
  });
  return <Text x={x} y={y} text={text} interactive onpointerdown={onNextPage} style={fontStyle} />;
});
