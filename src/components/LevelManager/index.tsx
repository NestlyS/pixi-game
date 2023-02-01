import React, { useCallback, useRef, useState } from 'react';
import { Graphics} from '@inlet/react-pixi';
import { Graphics as PIXI_Grapics } from 'pixi.js';
import { Body } from '../Body'
import { ChunkParams, Chunks } from './typings';
import { USER_BODY_GROUP } from '../../bodyGroups/user';
import { getRandomValue } from '../../utils/getRandomValue';
import { CHUNKS_TYPE } from './contants';
import { Row } from '../Chunk/components/Row';

const CHUNKS_BEFORE_END = 3;

const SENSOR_OPTIONS: Matter.IChamferableBodyDefinition = {
  isSensor: true,
  isStatic: true,
}

type Props = {
  x: number,
  y: number,
  tileSize: number,
  tilesHeight: number,
  chunkWidth: number,
  spritesheetUrl: string,
}

const appendChunk = ({ chunks, tileSize, chunkWidth }: {chunks: ChunkParams[], tileSize: number, chunkWidth: number}): ChunkParams[] => {
  const randomIndex = getRandomValue(0, Object.keys(CHUNKS_TYPE).length - 1);
  const randomType = Object.keys(CHUNKS_TYPE)[randomIndex] as Chunks;
  const randomParams = CHUNKS_TYPE[randomType];

  console.log('RANDOM', randomIndex, randomType, randomParams);

  const newChunks = [...chunks,
    {
      type: randomType,
      component: randomParams.component,
      renderKey: chunks[chunks.length - 1].renderKey + 1,
      key: chunks[chunks.length - 1].key >= 10 ? 0 : chunks[chunks.length - 1].key + 1,
      x: chunks[chunks.length - 1].x + (chunks[chunks.length - 1].width * tileSize),
      y: chunks[chunks.length - 1].y - chunks[chunks.length - 1].yDelta * tileSize,
      yDelta: randomParams.heightDelta ?? 0,
      width: randomParams.width ?? chunkWidth,
  }];

  if ((chunkWidth - newChunks[newChunks.length - 1].width) <= 0) return newChunks;
  return appendChunk({ chunks: newChunks, tileSize, chunkWidth: chunkWidth - newChunks[newChunks.length - 1].width })
}

export const LevelManager = ({
  x,
  y,
  tileSize,
  tilesHeight,
  chunkWidth,
  spritesheetUrl,
}: Props) => {
  const isCollisionDetectorVisibile = useRef(true);
  const [ chunks, setChunks ] = useState<ChunkParams[]>([
    {
      type: Chunks.Row,
      component: Row,
      yDelta: 0,
      key: 1,
      renderKey: 1,
      x,
      width: 8,
      y,
    }
  ]);

  const draw = useCallback((x: number, y: number) => (g: PIXI_Grapics) => {
    g.beginFill(0x5533cc, 1);
    g.drawRoundedRect(x, y, 80, 80, 15);
    g.endFill();
  }, []);


  const onCollision = useCallback(
    (e: Matter.IEventCollision<Matter.Engine>) => {
      if (!isCollisionDetectorVisibile.current || !e.pairs.some(pair => USER_BODY_GROUP.get().some( body => pair.bodyA.label === body.label || pair.bodyB.label === body.label))) return;
      console.log('------SENSOR!!!------');
      isCollisionDetectorVisibile.current = false;
      const newChunks = appendChunk({
        chunks: chunks.slice(-3),
        chunkWidth: chunkWidth,
        tileSize,
      });

      setChunks(newChunks);
      isCollisionDetectorVisibile.current = true;
    },
    [chunkWidth, chunks, tileSize],
  )

  const collisionDetectorX = chunks[chunks.findIndex((_, index, arr) => index >= arr.length - 1 - 1)].x;
  console.log('TOUCH', collisionDetectorX, chunks);

  return (
    <>
      {
        chunks
          .map(item =>
              <item.component
                key={item.key}
                width={item.width}
                tileSize={tileSize}
                tilesHeight={tilesHeight}
                x={item.x}
                y={item.y}
                spritesheetUrl={spritesheetUrl}
              />
            )
      }
      <Graphics draw={draw(chunks[chunks.length - 1].x, chunks[chunks.length - 1].y - tilesHeight * tileSize)}/>
      <Body width={60} height={10000} x={collisionDetectorX} y={0} options={SENSOR_OPTIONS} label="sensor" onCollision={onCollision} />
    </>
  )
}
