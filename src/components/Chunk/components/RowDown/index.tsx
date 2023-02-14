import { memo, useCallback } from 'react';
import {
  MIDDLE_PART_NAME,
  DIRT_MIDDLE_PART_NAME,
} from '../../../TileGround/components/Grass/contants';
import { Grass } from '../../../TileGround/components/Grass/Grass';
import { ChunkProps } from '../../typings';

export const ROW_WIDTH = 8;

export const RowDown = memo(
  ({ spritesheetUrl, x, y, tileSize, tilesHeight, width = ROW_WIDTH }: ChunkProps) => {
    const halfWidth = width / 2;

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
        <Grass
          textureModifier={textureModifier}
          spritesheetUrl={spritesheetUrl}
          x={x + (halfWidth * tileSize) / 2}
          y={y}
          tileSize={tileSize}
          tilesWidth={halfWidth}
          tilesHeight={tilesHeight}
        />
        <Grass
          textureModifier={textureModifier}
          spritesheetUrl={spritesheetUrl}
          x={x + halfWidth * tileSize + (halfWidth * tileSize) / 2}
          y={y + tileSize}
          tileSize={tileSize}
          tilesWidth={halfWidth}
          tilesHeight={tilesHeight}
        />
      </>
    );
  },
);
