import React from 'react';
import { useSelector } from 'react-redux';
import { ButtonWithText } from '../../../../../../../../../../components/ui/ButtonWithText';
import { usePositionContext } from '../../../../../../../../../../components/ui/DisplayWindow/context';
import { Filters, COLORS } from '../../../../../../../../../../constants';
import { selectAppControllerWidth } from '../../../../../../../../../../redux/appController/selectors';
import { useFont } from '../../../../../../../../../../utils/useFont';

const FILTER = [Filters.UI_GRADIENT_FILTER];

type Props = {
  onExit: () => void;
};

export const ButtonContinue = ({ onExit }: Props) => {
  const screenWidth = useSelector(selectAppControllerWidth);
  const { x, y, height, width } = usePositionContext();

  const fontWidth = screenWidth * 0.025;

  const fontStyle = useFont({
    align: 'center',
    fill: [COLORS.MainFontFill],
    stroke: COLORS.MainFontOutline,
    letterSpacing: 5,
    fontSize: fontWidth,
    strokeThickness: fontWidth / 4,
  });

  return (
    <ButtonWithText
      marginLeft={fontWidth}
      marginTop={0}
      x={x}
      y={y}
      height={height}
      width={width}
      fontStyle={fontStyle}
      onClick={onExit}
      filters={FILTER}
    >
      Продолжить
    </ButtonWithText>
  );
};
