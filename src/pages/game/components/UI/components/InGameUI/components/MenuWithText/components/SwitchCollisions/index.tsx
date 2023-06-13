import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonWithText } from '../../../../../../../../../../components/ui/ButtonWithText';
import { usePositionContext } from '../../../../../../../../../../components/ui/DisplayWindow/context';
import { Filters, COLORS } from '../../../../../../../../../../constants';
import { selectAppControllerWidth } from '../../../../../../../../../../redux/appController/selectors';
import { useFont } from '../../../../../../../../../../utils/useFont';
import { revertCollisions } from '../../../../../../../../../../redux/settings';
import { selectSettingsCollisionsVisiblity } from '../../../../../../../../../../redux/settings/selectors';

const FILTER = [Filters.UI_GRADIENT_FILTER];

export const SwitchCollisions = () => {
  const { x, y, height, width } = usePositionContext();
  const isCollisionVisible = useSelector(selectSettingsCollisionsVisiblity);
  const screenWidth = useSelector(selectAppControllerWidth);
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(revertCollisions());
  }, [dispatch]);

  const text = isCollisionVisible ? 'V Коллизии' : 'X Коллизии';
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
