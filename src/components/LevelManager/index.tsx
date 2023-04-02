import React, { useCallback, useRef, useState } from 'react';
import { Container } from '@pixi/react';
import { Body } from '../Body';
import { ChunkParams } from './typings';
import { USER_BODY_GROUP } from '../../bodyGroups/user';
import { __IS_DEV__ } from '../../constants';
import { appendChunk, cleanChunks } from './utils';
import { initialState } from './contants';

const SENSOR_OPTIONS: Matter.IChamferableBodyDefinition = {
  isSensor: true,
  isStatic: true,
};

type Props = {
  x: number;
  y: number;
  tileSize: number;
  tilesHeight: number;
  chunkWidth: number;
  spritesheetUrl: string;
};

export const LevelManager = ({
  x,
  y,
  tileSize,
  tilesHeight,
  chunkWidth,
  spritesheetUrl,
}: Props) => {
  const isCollisionDetectorVisibile = useRef(true);
  const [chunks, setChunks] = useState<ChunkParams[]>(initialState(x, y));
  const [sensorPosition, setSensorPosition] = useState(x);

  const onCollision = useCallback(
    (e: Matter.IEventCollision<Matter.Engine>) => {
      if (
        !isCollisionDetectorVisibile.current ||
        !e.pairs.some((pair) =>
          USER_BODY_GROUP.get().some(
            (body) => pair.bodyA.label === body.label || pair.bodyB.label === body.label,
          ),
        )
      )
        return;
      isCollisionDetectorVisibile.current = false;
      const newChunks = cleanChunks({
        chunks: appendChunk({
          chunks,
          chunkWidth,
          tileSize,
          sensorPosition,
        }),
        tileSize,
        chunkWidth,
        sensorPosition,
      });

      setSensorPosition((currX) => currX + (chunkWidth * tileSize) / 2);
      setChunks(newChunks);
      isCollisionDetectorVisibile.current = true;
    },
    [chunkWidth, chunks, sensorPosition, tileSize],
  );

  const collisionDetectorX = chunks[0].x + (chunkWidth * tileSize) / 2;
  console.log('TOUCH', collisionDetectorX, chunks);

  return (
    <>
      {chunks.map((item) => (
        <item.component
          key={item.key}
          width={item.width}
          tileSize={tileSize}
          tilesHeight={tilesHeight}
          x={item.x}
          y={item.y}
          spritesheetUrl={spritesheetUrl}
        />
      ))}
      <Body
        width={60}
        height={10000}
        x={sensorPosition}
        y={0}
        options={SENSOR_OPTIONS}
        label="sensor"
        onCollision={onCollision}
      />
    </>
  );
};
