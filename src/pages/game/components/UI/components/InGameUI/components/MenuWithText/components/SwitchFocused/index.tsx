import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonWithText } from '../../../../../../../../../../components/ui/ButtonWithText';
import { usePositionContext } from '../../../../../../../../../../components/ui/DisplayWindow/context';
import { Filters, COLORS } from '../../../../../../../../../../constants';
import { selectAppControllerWidth } from '../../../../../../../../../../redux/appController/selectors';
import { revertFocusOnMainBody } from '../../../../../../../../../../redux/settings';
import { selectSettingsMainBodyFocus } from '../../../../../../../../../../redux/settings/selectors';
import { useFont } from '../../../../../../../../../../utils/useFont';

const FILTER = [Filters.UI_GRADIENT_FILTER];

export const SwitchFocused = () => {
  const { x, y, height, width } = usePositionContext();
  const screenWidth = useSelector(selectAppControllerWidth);
  const isFocusedOnMainBody = useSelector(selectSettingsMainBodyFocus);
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(revertFocusOnMainBody());
  }, [dispatch]);

  const text = isFocusedOnMainBody ? 'V Фокус' : 'X Фокус';
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
