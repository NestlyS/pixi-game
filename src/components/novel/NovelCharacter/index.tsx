import React, { useMemo } from 'react';
import { useScreenHeight } from '../../../utils/useScreenHeight';
import { Sprite } from '../../Sprite';
import { COLOR_OVERLAY_FILTER_DARKER, SHADOW_FILTER } from '../../../constants';

const SPRITE_HEIGHT = 150;

type Props = {
  x: number;
  y: number;
  textureName: string;
  spritesheet: string;
  reverted?: boolean;
  isActive: boolean;
};

export const NovelCharacter = React.memo(
  ({ spritesheet, reverted, textureName, isActive, x, y }: Props) => {
    const height = useScreenHeight();
    const scale = useMemo(() => {
      const calcMult = (height / SPRITE_HEIGHT) * 1.3;

      return {
        x: (reverted ? -1 : 1) * calcMult,
        y: calcMult,
      };
    }, [height, reverted]);

    return (
      <Sprite
        x={x}
        y={y + (!isActive ? height / 20 : 0)}
        scale={scale}
        textureUrl={`${textureName}.png`}
        spritesheet={spritesheet}
        filters={[SHADOW_FILTER, ...(!isActive ? [COLOR_OVERLAY_FILTER_DARKER] : [])]}
      />
    );
  },
);
