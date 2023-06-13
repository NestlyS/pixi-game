import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonWithText } from '../../../../../../../../../../components/ui/ButtonWithText';
import { usePositionContext } from '../../../../../../../../../../components/ui/DisplayWindow/context';
import { Filters, COLORS } from '../../../../../../../../../../constants';
import { selectAppControllerWidth } from '../../../../../../../../../../redux/appController/selectors';
import { useFont } from '../../../../../../../../../../utils/useFont';
import { revertAutorunState } from '../../../../../../../../../../redux/settings';
import { selectSettingsAutorunState } from '../../../../../../../../../../redux/settings/selectors';

const FILTER = [Filters.UI_GRADIENT_FILTER];

export const SwitchAutorun = () => {
  const { x, y, height, width } = usePositionContext();
  const isAutorunEnabled = useSelector(selectSettingsAutorunState);
  const screenWidth = useSelector(selectAppControllerWidth);
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(revertAutorunState());
  }, [dispatch]);

  const text = isAutorunEnabled ? 'V Автобег' : 'X Автобег';
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
      onClick={onClick}
      filters={FILTER}
    >
      {text}
    </ButtonWithText>
  );
};
