import { Graphics as PIXI_Graphics } from 'pixi.js';
import { Graphics } from '@pixi/react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { COLORS } from '../../../constants';
import {
  selectAppControllerWidth,
  selectAppControllerHeight,
} from '../../../redux/appController/selectors';
import React from 'react';

export type HoleType = { x: number; y: number; width: number; height: number; withLine?: boolean };

type Props = {
  color: COLORS;
  alpha?: number;
  hole?: HoleType;
};

export const FullscreenRect = React.memo(({ color, alpha = 1, hole }: Props) => {
  const screenWidth = useSelector(selectAppControllerWidth);
  const screenHeight = useSelector(selectAppControllerHeight);

  const draw = useCallback(
    (grap: PIXI_Graphics) => {
      const rect = grap
        .clear()
        .beginFill(color, alpha)
        .drawRect(0, 0, screenWidth + 1, screenHeight)
        .endFill();
      if (hole) {
        rect.beginHole().drawRect(hole.x, hole.y, hole.width, hole.height).endHole();
      }

      if (hole && hole.withLine) {
        rect
          .lineStyle({ width: 5, color: COLORS.White })
          .drawRect(hole.x, hole.y, hole.width, hole.height);
      }

      rect.endFill();
    },
    [alpha, color, hole, screenHeight, screenWidth],
  );

  return <Graphics draw={draw} />;
});
