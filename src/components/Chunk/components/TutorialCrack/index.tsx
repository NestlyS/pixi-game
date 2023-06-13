import React, { memo } from 'react';
import { IEventCollision, Engine } from 'matter-js';
import { ChunkProps } from '../../typings';
import { Crack } from '../Crack';
import { VerticalSensor } from '../../../VerticalSensor';

export const CRACK_ROW_WIDTH = 8;

export const TutorialCrack = memo(
  ({
    spritesheetUrl,
    x,
    y,
    tileSize,
    tilesHeight,
    width = CRACK_ROW_WIDTH,
    onCollision,
    zIndex,
  }: ChunkProps & { onCollision: (e: IEventCollision<Engine>) => void }) => (
    <>
      <VerticalSensor
        x={x + width * tileSize * 0.45}
        y={0}
        onCollision={onCollision}
        isUserCollisionOnly
      />
      <Crack
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
