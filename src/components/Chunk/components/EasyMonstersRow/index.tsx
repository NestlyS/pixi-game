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
import { VerticalSensor } from '../../../VerticalSensor';
import { IEventCollision, Engine } from 'matter-js';
import { MonstersRow } from '../MonstersRow';

export const AI_SENSOR_OPTIONS: Matter.IChamferableBodyDefinition = {
  isStatic: true,
  isSensor: true,
  friction: 0,
};

export const MONSTERS_ROW_WIDTH = 10;

export const EasyMonstersRow = memo(
  ({
    spritesheetUrl,
    x,
    y,
    tileSize,
    tilesHeight,
    width = MONSTERS_ROW_WIDTH,
    onCollision,
    zIndex,
  }: ChunkProps & { onCollision: (e: IEventCollision<Engine>) => void }) => (
    <>
      <VerticalSensor
        x={x + width * tileSize * 0.6}
        y={0}
        onCollision={onCollision}
        isUserCollisionOnly
      />
      <MonstersRow
        width={width}
        tileSize={tileSize}
        tilesHeight={tilesHeight}
        spritesheetUrl={spritesheetUrl}
        x={x}
        y={y}
        zIndex={zIndex}
      />
    </>
  ),
);
