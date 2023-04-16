import React, { memo, useCallback, useState } from 'react';
import { Filter } from 'pixi.js';
import { Text } from '@pixi/react';
import { Button } from '../../../Button';
import {
  COLOR_OVERLAY_FILTER_STEP_0,
  JUMP_KEY_CODE,
  PIXEL_FONT,
  PURPLE_OUTLINE_FILTER,
} from '../../../../../constants';
import { emitKeyboardSignal, SignalList } from '../../../../../utils/signaller/emitSignal';
import { UI_SPRITESHEET } from '../../../UI';

const JUMP_BUTTON = 'jump.png';

type Props = {
  y: number;
  x: number;
};

export const ButtonJump = memo(({ y, x }: Props) => {
  const [filter, setFilter] = useState<Filter[]>([]);

  // Странный баг если удалить эту функцию
  const onJump = useCallback(() => {}, []);

  const onHover = useCallback(() => {
    setFilter([COLOR_OVERLAY_FILTER_STEP_0]);
    emitKeyboardSignal(SignalList.KeyDown, { code: JUMP_KEY_CODE });
  }, []);

  const onHoverOut = useCallback(() => {
    setFilter([]);
    emitKeyboardSignal(SignalList.KeyUp, { code: JUMP_KEY_CODE });
  }, []);

  const text = JUMP_KEY_CODE.replace('Key', '');

  return (
    <>
      <Button
        x={x}
        y={y}
        onClick={onJump}
        onHover={onHover}
        onHoverOut={onHoverOut}
        width={100}
        height={100}
        spritesheetUrl={UI_SPRITESHEET}
        textureUrl={JUMP_BUTTON}
        pixelised
        filters={filter}
      />
      <Text filters={[PURPLE_OUTLINE_FILTER]} x={x + 80} y={y} text={text} style={PIXEL_FONT} />
    </>
  );
});
