import React, { useMemo } from 'react';
import { useScreenHeight } from '../../../../../utils/useScreenHeight';
import { Sprite } from '../../../../Sprite';
import { Filters } from '../../../../../constants';

const SPRITE_HEIGHT = 150;

type Props = {
  x: number;
  y: number;
  textureName: string;
  spritesheet: string;
};

const filters = [Filters.SHADOW_FILTER];

export const CharacterPreview = React.memo(({ spritesheet, textureName, x, y }: Props) => {
  const height = useScreenHeight();
  const scale = useMemo(() => {
    const calcMult = (height / SPRITE_HEIGHT) * 1.3;

    return {
      x: calcMult * -1,
      y: calcMult,
    };
  }, [height]);

  return (
    <Sprite
      x={x}
      y={y}
      scale={scale}
      textureUrl={`${textureName}.png`}
      spritesheet={spritesheet}
      filters={filters}
    />
  );
});
