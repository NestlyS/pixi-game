import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Text } from '@pixi/react';
import {
  Filters,
  ATTACK_KEY_CODE,
  UI_SPRITESHEET_URL,
  PIXEL_FONT,
} from '../../../../../../../../../../constants';
import { selectAppControllerWidth } from '../../../../../../../../../../redux/appController/selectors';
import { selectMainUserAttackCooldown } from '../../../../../../../../../../redux/mainUser/selectors';
import {
  emitKeyboardSignal,
  SignalList,
} from '../../../../../../../../../../utils/signaller/emitSignal';
import { useLowGraphic } from '../../../../../../../../../../utils/useLowGraphic';
import { ButtonWithCooldown } from '../ButtonWithCooldown';

const ATTACK_BUTTON = 'icon_attack.png';

type Props = {
  y: number;
  x: number;
};

export const ButtonAttack = memo(({ y, x }: Props) => {
  const attackCooldown = useSelector(selectMainUserAttackCooldown);
  const screenWidth = useSelector(selectAppControllerWidth);
  const filters = useLowGraphic([Filters.PURPLE_OUTLINE_FILTER]);

  const onJump = useCallback(() => {
    emitKeyboardSignal(SignalList.KeyDown, { code: ATTACK_KEY_CODE });
    emitKeyboardSignal(SignalList.KeyUp, { code: ATTACK_KEY_CODE });
  }, []);

  const text = ATTACK_KEY_CODE.replace('Key', '');

  return (
    <>
      <ButtonWithCooldown
        x={x}
        y={y}
        onClick={onJump}
        width={screenWidth * 0.1}
        height={screenWidth * 0.1}
        spritesheetUrl={UI_SPRITESHEET_URL}
        textureUrl={ATTACK_BUTTON}
        pixelised
        cooldown={attackCooldown}
      />
      <Text filters={filters} x={x + screenWidth * 0.07} y={y} text={text} style={PIXEL_FONT} />
    </>
  );
});
