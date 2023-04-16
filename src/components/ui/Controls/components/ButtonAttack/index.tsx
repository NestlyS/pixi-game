import React, { memo, useCallback, useState } from 'react';
import { Filter } from 'pixi.js';
import { useSelector } from 'react-redux';
import { Text } from '@pixi/react';
import {
  ATTACK_KEY_CODE,
  COLOR_OVERLAY_FILTER_STEP_0,
  PIXEL_FONT,
  PURPLE_OUTLINE_FILTER,
} from '../../../../../constants';
import { emitKeyboardSignal, SignalList } from '../../../../../utils/signaller/emitSignal';
import { UI_SPRITESHEET } from '../../../UI';
import { ButtonWithCooldown } from '../ButtonWithCooldown';
import { selectMainUserAttackCooldown } from '../../../../../redux/mainUser/selectors';

const ATTACK_BUTTON = 'icon_attack.png';

type Props = {
  y: number;
  x: number;
};

export const ButtonAttack = memo(({ y, x }: Props) => {
  const [filter, setFilter] = useState<Filter[]>([]);
  const attackCooldown = useSelector(selectMainUserAttackCooldown);

  // Странный баг если удалить эту функцию
  const onJump = useCallback(() => {
    emitKeyboardSignal(SignalList.KeyDown, { code: ATTACK_KEY_CODE });
    emitKeyboardSignal(SignalList.KeyUp, { code: ATTACK_KEY_CODE });
  }, []);

  const onHover = useCallback(() => {
    setFilter([COLOR_OVERLAY_FILTER_STEP_0]);
  }, []);

  const onHoverOut = useCallback(() => {
    setFilter([]);
  }, []);

  const text = ATTACK_KEY_CODE.replace('Key', '');

  return (
    <>
      <ButtonWithCooldown
        x={x}
        y={y}
        onClick={onJump}
        onHover={onHover}
        onHoverOut={onHoverOut}
        width={100}
        height={100}
        spritesheetUrl={UI_SPRITESHEET}
        textureUrl={ATTACK_BUTTON}
        pixelised
        filters={filter}
        cooldown={attackCooldown}
      />
      <Text filters={[PURPLE_OUTLINE_FILTER]} x={x + 80} y={y} text={text} style={PIXEL_FONT} />
    </>
  );
});
