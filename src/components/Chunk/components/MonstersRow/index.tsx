import { Container } from '@pixi/react';
import { memo, useCallback } from 'react';
import { AI_SENSOR_LABEL } from '../../../../constants';
import { Body } from '../../../Body';
import { MonsterWithTrash } from '../../../Monster/MonsterWithTrash';
import {
  MIDDLE_PART_NAME,
  DIRT_MIDDLE_PART_NAME,
} from '../../../TileGround/components/Grass/contants';
import { Grass } from '../../../TileGround/components/Grass/Grass';
import { ChunkProps } from '../../typings';

export const AI_SENSOR_OPTIONS: Matter.IChamferableBodyDefinition = {
  isStatic: true,
  isSensor: true,
  friction: 0,
};

export const MONSTERS_ROW_WIDTH = 10;

export const MonstersRow = memo(
  ({ spritesheetUrl, x, y, tileSize, tilesHeight, width = MONSTERS_ROW_WIDTH }: ChunkProps) => {
    const textureModifier = useCallback((indexX: number, indexY: number, length: number) => {
      if (indexY === 0 && indexX <= length - 1) {
        return MIDDLE_PART_NAME;
      }

      return DIRT_MIDDLE_PART_NAME;
    }, []);

    return (
      <Container sortableChildren>
        <Body
          label={AI_SENSOR_LABEL}
          x={x}
          y={y - (tilesHeight * tileSize) / 2}
          width={tileSize}
          height={tileSize * 4}
          options={AI_SENSOR_OPTIONS}
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
        <Body
          label={AI_SENSOR_LABEL}
          x={x + width * tileSize}
          y={y - (tilesHeight * tileSize) / 2}
          width={tileSize}
          height={tileSize * 4}
          options={AI_SENSOR_OPTIONS}
        />
        <MonsterWithTrash
          x={x + width * tileSize * 0.7}
          y={y - ((tilesHeight + 1) * tileSize) / 2}
        />
      </Container>
    );
  },
);
