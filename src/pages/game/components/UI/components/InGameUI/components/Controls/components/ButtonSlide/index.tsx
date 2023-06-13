import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Text } from '@pixi/react';
import { Button } from '../../../../../../../../../../components/ui/Button';
import {
  Filters,
  SLIDE_KEY_CODE,
  UI_SPRITESHEET_URL,
  PIXEL_FONT,
} from '../../../../../../../../../../constants';
import { selectAppControllerWidth } from '../../../../../../../../../../redux/appController/selectors';
import {
  emitKeyboardSignal,
  SignalList,
} from '../../../../../../../../../../utils/signaller/emitSignal';
import { useLowGraphic } from '../../../../../../../../../../utils/useLowGraphic';

const SLIDE_BUTTON = 'down.png';

type Props = {
  y: number;
  x: number;
};

export const ButtonSlide = memo(({ y, x }: Props) => {
  const screenWidth = useSelector(selectAppControllerWidth);
  const filters = useLowGraphic([Filters.PURPLE_OUTLINE_FILTER]);

  // Странный баг если удалить эту функцию
  const onJump = useCallback(() => {}, []);

  const onHover = useCallback(() => {
    emitKeyboardSignal(SignalList.KeyDown, { code: SLIDE_KEY_CODE });
  }, []);

  const onHoverOut = useCallback(() => {
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
        width={screenWidth * 0.1}
        height={screenWidth * 0.1}
        spritesheetUrl={UI_SPRITESHEET_URL}
        textureUrl={SLIDE_BUTTON}
        pixelised
      />
      <Text filters={filters} x={x + screenWidth * 0.07} y={y} text={text} style={PIXEL_FONT} />
    </>
  );
});
