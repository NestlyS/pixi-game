import React from 'react';
import { Button } from '../../../Button';
import { useScreenWidth } from '../../../../../utils/useScreenWidth';
import { UI_SPRITESHEET } from '../../../UI';

const PAUSE_NAME = 'pause.png';

type Props = {
  onClick: () => void;
};

export const MenuButton = ({ onClick }: Props) => {
  const screenWidth = useScreenWidth();

  return (
    <Button
      onClick={onClick}
      y={10}
      x={screenWidth - 110}
      width={100}
      height={100}
      spritesheetUrl={UI_SPRITESHEET}
      textureUrl={PAUSE_NAME}
      pixelised
    />
  );
};
