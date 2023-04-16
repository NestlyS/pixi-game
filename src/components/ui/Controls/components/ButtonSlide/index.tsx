import React, { memo, useCallback, useState } from 'react';
import { Filter } from 'pixi.js';
import { Text } from '@pixi/react';
import { Button } from '../../../Button';
import {
  COLOR_OVERLAY_FILTER_STEP_0,
  PIXEL_FONT,
  PURPLE_OUTLINE_FILTER,
  SLIDE_KEY_CODE,
} from '../../../../../constants';
import { emitKeyboardSignal, SignalList } from '../../../../../utils/signaller/emitSignal';
import { UI_SPRITESHEET } from '../../../UI';

const SLIDE_BUTTON = 'down.png';

type Props = {
  y: number;
  x: number;
};

export const ButtonSlide = memo(({ y, x }: Props) => {
  const [filter, setFilter] = useState<Filter[]>([]);

  // Странный баг если удалить эту функцию
  const onJump = useCallback(() => {}, []);

  const onHover = useCallback(() => {
    emitKeyboardSignal(SignalList.KeyDown, { code: SLIDE_KEY_CODE });
    setFilter([COLOR_OVERLAY_FILTER_STEP_0]);
  }, []);

  const onHoverOut = useCallback(() => {
    setFilter([]);
    emitKeyboardSignal(SignalList.KeyUp, { code: SLIDE_KEY_CODE });
  }, []);

  const text = SLIDE_KEY_CODE.replace('Key', '');

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
        textureUrl={SLIDE_BUTTON}
        pixelised
        filters={filter}
      />
      <Text filters={[PURPLE_OUTLINE_FILTER]} x={x + 80} y={y} text={text} style={PIXEL_FONT} />
    </>
  );
});
