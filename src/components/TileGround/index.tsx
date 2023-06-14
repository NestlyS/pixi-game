import React, { memo, useMemo } from 'react';
import { Ground } from '../Ground';
import { Row } from './Row';

export type Props = {
  x: number;
  y: number;
  tileSize: number;
  tilesWidth: number;
  tilesHeight: number;
  spritesheetUrl: string;
  getTexture: (indexX: number, indexY: number, length: number, height: number) => string;
};

export const TileGround = memo(
  ({ x, y, tileSize, tilesWidth, tilesHeight, spritesheetUrl, getTexture }: Props) => {
    const bodyWidth = tilesWidth * tileSize;
    const bodyHeight = tilesHeight * tileSize;

    return (
      <Ground x={x} y={y} width={bodyWidth} height={bodyHeight}>
        {new Array(Math.floor(tilesHeight)).fill(0).map((_, index) => {
          const innerY = y - bodyHeight / 2 + index * tileSize;
          const cb = (indexX: number) => getTexture(indexX, index, tilesWidth, tilesHeight);
          const innerX = Math.round(x - bodyWidth / 2);

          return (
            <Row
              key={index}
              tilesCount={tilesWidth}
              startX={innerX}
              startY={innerY}
              tileSize={tileSize}
              spritesheet={spritesheetUrl}
              getTexture={cb}
            />
          );
        })}
      </Ground>
    );
  },
);
