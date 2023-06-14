import { memo, useCallback } from 'react';
import {
  MIDDLE_PART_NAME,
  DIRT_MIDDLE_PART_NAME,
  GRASS_SMOOTH_DOWN_TRANSITION,
  GRASS_UNDER_SMOOTH_DOWN_TRANSITION,
} from '../../../TileGround/components/Grass/contants';
import { Grass } from '../../../TileGround/components/Grass/Grass';
import { ChunkProps } from '../../typings';
import { Body } from '../../../Body';
import { Sprite } from '../../../Sprite';
import { Row } from '../../../TileGround/Row';
import { Container } from '@pixi/react';

export const ROW_WIDTH = 8;
const getTexture = () => DIRT_MIDDLE_PART_NAME;

const TRAMPLIN_CONFIG = {
  isStatic: true,
};

export const RowDown = memo(
  ({ spritesheetUrl, x, y, tileSize, tilesHeight, width = ROW_WIDTH, zIndex }: ChunkProps) => {
    const halfWidth = width / 2;

    const textureModifier = useCallback((indexX: number, indexY: number, length: number) => {
      if (indexY === 0 && indexX <= length - 1) {
        return MIDDLE_PART_NAME;
      }

      return DIRT_MIDDLE_PART_NAME;
    }, []);

    return (
      <Container zIndex={zIndex}>
        <Grass
          textureModifier={textureModifier}
          spritesheetUrl={spritesheetUrl}
          x={x + (halfWidth * tileSize) / 2}
          y={y}
          tileSize={tileSize}
          tilesWidth={halfWidth}
          tilesHeight={tilesHeight}
        />
        <Body
          x={x + halfWidth * tileSize + tileSize * 0.2}
          y={y - tilesHeight * tileSize + tileSize * 1.9}
          width={tileSize * 1.5}
          height={tileSize}
          rotation={0.7}
          options={TRAMPLIN_CONFIG}
        />
        <Sprite
          x={x + halfWidth * tileSize}
          y={y - tilesHeight * tileSize + tileSize}
          width={tileSize}
          height={tileSize}
          spritesheet={spritesheetUrl}
          textureUrl={GRASS_SMOOTH_DOWN_TRANSITION}
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

        <Sprite
          x={x + halfWidth * tileSize}
          y={y - tilesHeight * tileSize + tileSize * 2}
          width={tileSize}
          height={tileSize}
          spritesheet={spritesheetUrl}
          textureUrl={GRASS_UNDER_SMOOTH_DOWN_TRANSITION}
        />

        <Row
          tilesCount={width / 2}
          startX={x + tileSize / 2}
          startY={y + (tileSize * (tilesHeight)) / 2}
          tileSize={tileSize}
          spritesheet={spritesheetUrl}
          getTexture={getTexture}
        />
      </Container>
    );
  },
);
