import { memo, useCallback } from 'react';
import { Text } from '@pixi/react';
import { useSelector } from 'react-redux';

import { HEAL_KEY_CODE, PIXEL_FONT, PURPLE_OUTLINE_FILTER } from '../../../../../constants';
import { emitKeyboardSignal, SignalList } from '../../../../../utils/signaller/emitSignal';
import { UI_SPRITESHEET } from '../../../UI';
import { selectMainUserSpecialCooldown } from '../../../../../redux/mainUser/selectors';
import { ButtonWithCooldown } from '../ButtonWithCooldown';

const WIDTH = 100;
const HEIGHT = 100;
const HEAL_BUTTON = 'icon_heal.png';

type Props = {
  y: number;
  x: number;
};

export const ButtonHeal = memo(({ y, x }: Props) => {
  const healCooldown = useSelector(selectMainUserSpecialCooldown);

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
        width={WIDTH}
        height={HEIGHT}
        spritesheetUrl={UI_SPRITESHEET}
        textureUrl={HEAL_BUTTON}
        cooldown={healCooldown}
      />
      <Text filters={[PURPLE_OUTLINE_FILTER]} x={x + 80} y={y} text={text} style={PIXEL_FONT} />
    </>
  );
});
