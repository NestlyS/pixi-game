import { memo, useCallback } from 'react';
import {
  MIDDLE_PART_NAME,
  DIRT_MIDDLE_PART_NAME,
  GRASS_SMOOTH_UP_TRANSITION,
  GRASS_UNDER_SMOOTH_UP_TRANSITION,
} from '../../../TileGround/components/Grass/contants';
import { Grass } from '../../../TileGround/components/Grass/Grass';
import { ChunkProps } from '../../typings';
import { Body } from '../../../Body';
import { Sprite } from '../../../Sprite';
import { Row } from '../../../TileGround/Row';

const getTexture = () => DIRT_MIDDLE_PART_NAME;

const TRAMPLIN_CONFIG = {
  isStatic: true,
};
export const ROW_WIDTH = 8;

export const RowUp = memo(
  ({ spritesheetUrl, x, y, tileSize, tilesHeight, width = ROW_WIDTH }: ChunkProps) => {
    const halfWidth = width / 2;

    const textureModifier = useCallback(
      (indexX: number, indexY: number, length: number) => {
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

        <Sprite
          x={x + halfWidth * tileSize - tileSize}
          y={y - tilesHeight * tileSize}
          width={tileSize}
          height={tileSize}
          spritesheet={spritesheetUrl}
          textureUrl={GRASS_SMOOTH_UP_TRANSITION}
        />
        <Sprite
          x={x + halfWidth * tileSize - tileSize}
          y={y - tilesHeight * tileSize + tileSize}
          width={tileSize}
          height={tileSize}
          spritesheet={spritesheetUrl}
          textureUrl={GRASS_UNDER_SMOOTH_UP_TRANSITION}
        />
        <Body
          x={x + halfWidth * tileSize - tileSize * 0.4}
          y={y - tilesHeight * tileSize + tileSize * 1}
          width={tileSize * 2}
          height={tileSize}
          rotation={-0.7}
          options={TRAMPLIN_CONFIG}
        />

        <Grass
          textureModifier={textureModifier}
          spritesheetUrl={spritesheetUrl}
          x={x + halfWidth * tileSize + (halfWidth * tileSize) / 2}
          y={y - tileSize}
          tileSize={tileSize}
          tilesWidth={halfWidth}
          tilesHeight={tilesHeight}
        />
        <Row
          tilesCount={width}
          startX={x + tileSize / 2 + halfWidth * tileSize}
          startY={y - (tileSize / 2) + (tileSize * tilesHeight) / 2}
          tileSize={tileSize}
          spritesheet={spritesheetUrl}
          getTexture={getTexture}
        />
      </>
    );
  },
);
