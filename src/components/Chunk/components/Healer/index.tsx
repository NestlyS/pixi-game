import React, { memo } from 'react';
import { Grass } from '../../../TileGround/components/Grass/Grass';
import { ChunkProps } from '../../typings';
import { Healer } from '../../../Healer';

export const HEALER_ROW_WIDTH = 4;

export const HealerChunk = memo(
  ({ spritesheetUrl, x, y, tileSize, tilesHeight, width = HEALER_ROW_WIDTH }: ChunkProps) => {
    return (
      <>
        <Healer x={x - (tileSize * width) / 2} y={y} />
        <Grass
          spritesheetUrl={spritesheetUrl}
          x={x}
          y={y}
          tileSize={tileSize}
          tilesWidth={width}
          tilesHeight={tilesHeight}
        />
      </>
    );
  },
);
