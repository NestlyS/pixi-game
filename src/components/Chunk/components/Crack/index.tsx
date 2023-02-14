import React, { memo, useCallback } from 'react';
import {
  DIRT_MIDDLE_PART_NAME,
  DIRT_RIGHT_EDGE_NAME,
  MIDDLE_PART_NAME,
  RIGHT_EDGE_NAME,
} from '../../../TileGround/components/Grass/contants';
import { Grass } from '../../../TileGround/components/Grass/Grass';
import { TrashRow } from '../../../trashes/TrashRow';
import { ChunkProps } from '../../typings';

export const CRACK_ROW_WIDTH = 8;
const CRACK_WIDTH = 4;

export const Crack = memo(
  ({ spritesheetUrl, x, y, tileSize, tilesHeight, width = CRACK_ROW_WIDTH }: ChunkProps) => {
    const crackWidth = Math.ceil((width - CRACK_WIDTH) / 2);
    const firstCrackCenter = x + (crackWidth * tileSize) / 2;
    const secondCrackCenter =
      firstCrackCenter +
      (crackWidth * tileSize) / 2 +
      (crackWidth * tileSize) / 2 +
      CRACK_WIDTH * tileSize;
    const textureModifier = useCallback(
      (indexX: number, indexY: number, length: number, height: number) => {
        if (indexY === 0 && indexX === 0) {
          return MIDDLE_PART_NAME;
        }

        if (indexY === 0 && indexX === length - 1) {
          return RIGHT_EDGE_NAME;
        }

        if (indexY > 0 && indexX === length - 1) {
          return DIRT_RIGHT_EDGE_NAME;
        }

        return DIRT_MIDDLE_PART_NAME;
      },
      [],
    );

    return (
      <>
        <TrashRow
          x={x + crackWidth * tileSize + tileSize / 2}
          y={y - (tilesHeight * tileSize) / 2 - tileSize * 2}
          tileSize={tileSize}
          width={CRACK_WIDTH}
          type={'random'}
        />
        <Grass
          textureModifier={textureModifier}
          spritesheetUrl={spritesheetUrl}
          x={firstCrackCenter}
          y={y}
          tileSize={tileSize}
          tilesWidth={crackWidth}
          tilesHeight={tilesHeight}
        />
        <Grass
          spritesheetUrl={spritesheetUrl}
          x={secondCrackCenter}
          y={y}
          tileSize={tileSize}
          tilesWidth={crackWidth}
          tilesHeight={tilesHeight}
        />
      </>
    );
  },
);
