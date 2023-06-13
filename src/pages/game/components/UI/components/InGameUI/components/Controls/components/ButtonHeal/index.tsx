import { memo, useCallback } from 'react';
import { Text } from '@pixi/react';
import { useSelector } from 'react-redux';
import {
  Filters,
  HEAL_KEY_CODE,
  UI_SPRITESHEET_URL,
  PIXEL_FONT,
} from '../../../../../../../../../../constants';
import { selectAppControllerWidth } from '../../../../../../../../../../redux/appController/selectors';
import { selectMainUserSpecialCooldown } from '../../../../../../../../../../redux/mainUser/selectors';
import {
  emitKeyboardSignal,
  SignalList,
} from '../../../../../../../../../../utils/signaller/emitSignal';
import { useLowGraphic } from '../../../../../../../../../../utils/useLowGraphic';
import { ButtonWithCooldown } from '../ButtonWithCooldown';

const HEAL_BUTTON = 'icon_heal.png';

type Props = {
  y: number;
  x: number;
};

export const ButtonHeal = memo(({ y, x }: Props) => {
  const healCooldown = useSelector(selectMainUserSpecialCooldown);
  const screenWidth = useSelector(selectAppControllerWidth);
  const filters = useLowGraphic([Filters.PURPLE_OUTLINE_FILTER]);

  const onClick = useCallback(() => {
    emitKeyboardSignal(SignalList.KeyDown, { code: HEAL_KEY_CODE });
    emitKeyboardSignal(SignalList.KeyUp, { code: HEAL_KEY_CODE });
  }, []);

  const text = HEAL_KEY_CODE.replace('Key', '');

  return (
    <>
      <ButtonWithCooldown
        x={x}
        y={y}
        onClick={onClick}
        width={screenWidth * 0.1}
        height={screenWidth * 0.1}
        spritesheetUrl={UI_SPRITESHEET_URL}
        textureUrl={HEAL_BUTTON}
        cooldown={healCooldown}
      />
      <Text filters={filters} x={x + screenWidth * 0.07} y={y} text={text} style={PIXEL_FONT} />
    </>
  );
});
