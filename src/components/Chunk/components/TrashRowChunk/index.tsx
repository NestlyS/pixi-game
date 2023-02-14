import { memo, useCallback } from 'react';
import {
  MIDDLE_PART_NAME,
  DIRT_MIDDLE_PART_NAME,
} from '../../../TileGround/components/Grass/contants';
import { Grass } from '../../../TileGround/components/Grass/Grass';
import { TrashRow } from '../../../trashes/TrashRow';
import { ChunkProps } from '../../typings';

export const ROW_WIDTH = 8;

export const TrashRowChunk = memo(
  ({ spritesheetUrl, x, y, tileSize, tilesHeight, width = ROW_WIDTH }: ChunkProps) => {
    const textureModifier = useCallback(
      (indexX: number, indexY: number, length: number, height: number) => {
        if (indexY === 0 && indexX <= length - 1) {
          return MIDDLE_PART_NAME;
        }

        return DIRT_MIDDLE_PART_NAME;
      },
      [],
    );

    return (
      <>
        <TrashRow
          x={x + tileSize}
          y={y - ((tilesHeight + 1) * tileSize) / 2}
          tileSize={tileSize}
          width={width - 2}
          type="random"
        />
        <Grass
          textureModifier={textureModifier}
          spritesheetUrl={spritesheetUrl}
          x={x + (width * tileSize) / 2}
          y={y}
          tileSize={tileSize}
          tilesWidth={width}
          tilesHeight={tilesHeight}
        />
      </>
    );
  },
);
