import React, { memo, useCallback } from 'react';
import { Text } from '@pixi/react';
import { useSelector } from 'react-redux';
import { Button } from '../../../../../../../../../../components/ui/Button';
import {
  Filters,
  JUMP_KEY_CODE,
  UI_SPRITESHEET_URL,
  PIXEL_FONT,
} from '../../../../../../../../../../constants';
import { selectAppControllerWidth } from '../../../../../../../../../../redux/appController/selectors';
import {
  emitKeyboardSignal,
  SignalList,
} from '../../../../../../../../../../utils/signaller/emitSignal';
import { useLowGraphic } from '../../../../../../../../../../utils/useLowGraphic';

const JUMP_BUTTON = 'jump.png';

type Props = {
  y: number;
  x: number;
};

export const ButtonJump = memo(({ y, x }: Props) => {
  const screenWidth = useSelector(selectAppControllerWidth);
  const filters = useLowGraphic([Filters.PURPLE_OUTLINE_FILTER]);

  // Странный баг если удалить эту функцию
  const onJump = useCallback(() => {}, []);

  const onHover = useCallback(() => {
    // setFilter([COLOR_OVERLAY_FILTER_STEP_0]);
    emitKeyboardSignal(SignalList.KeyDown, { code: JUMP_KEY_CODE });
  }, []);

  const onHoverOut = useCallback(() => {
    //    setFilter([]);
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
        width={screenWidth * 0.1}
        height={screenWidth * 0.1}
        spritesheetUrl={UI_SPRITESHEET_URL}
        textureUrl={JUMP_BUTTON}
        pixelised
      />
      <Text filters={filters} x={x + screenWidth * 0.07} y={y} text={text} style={PIXEL_FONT} />
    </>
  );
});
