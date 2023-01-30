import React, { useCallback, useMemo, useState } from 'react';
import { Graphics} from '@inlet/react-pixi';
import { Graphics as PIXI_Grapics } from 'pixi.js';
import { Body } from '../Body'
import { LevelManagerContextProvider } from './context'
import { ChunkParams, Chunks } from './typings';
import { ChunkRenderer } from './ChunkRendered';
import { USER_BODY_GROUP } from '../../bodyGroups/user';
import { Chunk } from '../Chunk';
import { TrashRowChunk } from '../Chunk/components/TrashRowChunk';
import { getRandomValue } from '../../utils/getRandomValue';
import { Crack } from '../Chunk/components/Crack';
import { CHUNKS_TYPE } from './contants';
import { MonstersRow } from '../Chunk/components/MonstersRow';

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

const appendChunk = ({ chunks, tileSize, lastBlockOffset, chunkWidth }: {chunks: ChunkParams[], tileSize: number, lastBlockOffset: number, chunkWidth: number}): ChunkParams[] => {
  const randomIndex = getRandomValue(0, Object.keys(CHUNKS_TYPE).length - 1);
  const randomType = Object.keys(CHUNKS_TYPE)[randomIndex] as Chunks;
  const randomParams = CHUNKS_TYPE[randomType];

  console.log(randomIndex, randomType, randomParams);

  const newChunks = [...chunks,
    {
      type: randomType,
      renderKey: chunks[chunks.length - 1].renderKey + 1,
      key: chunks[chunks.length - 1].key + 1,
      x: chunks[chunks.length - 1].x + (chunks[chunks.length - 1].width * tileSize),
      width: randomParams.width ?? chunkWidth,
      y: chunks[chunks.length - 1].y - (chunks[chunks.length - 1].type === Chunks.Default ? lastBlockOffset * tileSize : 0),
  }];

  if ((chunkWidth - newChunks[newChunks.length - 1].width) <= 0) return newChunks;
  return appendChunk({ chunks: newChunks, tileSize, lastBlockOffset, chunkWidth: chunkWidth - newChunks[newChunks.length - 1].width })
}

export const LevelManager = ({
  x,
  y,
  tileSize,
  tilesHeight,
  chunkWidth,
  spritesheetUrl,
}: Props) => {
  const [ lastBlockOffset, setLastBlockOffset ] = useState(0);
  const [ isCollisionDetectorVisibile, setCollisionDetectorVisibility ] = useState(true);
  const [ chunks, setChunks ] = useState<ChunkParams[]>([
    {
      type: Chunks.Default,
      key: 1,
      renderKey: 1,
      x,
      width: chunkWidth,
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
      if (!e.pairs.some(pair => USER_BODY_GROUP.get().some( body => pair.bodyA.label === body.label || pair.bodyB.label === body.label))) return;
      console.log('------SENSOR!!!------');
      setCollisionDetectorVisibility(false);
      const newChunks = appendChunk({
        chunks: chunks.slice(-1),
        chunkWidth,
        tileSize,
        lastBlockOffset
      });

      setChunks(newChunks);
      setCollisionDetectorVisibility(true);
    },
    [chunkWidth, chunks, lastBlockOffset, tileSize],
  )

  const value = useMemo(() => ({
    setLastBlockOffset: (yOffset: number) => setLastBlockOffset(yOffset),
  }), []);

  return (
    <LevelManagerContextProvider value={value}>
      {
        chunks
          .map(item => {
            if (item.type === Chunks.Row) return <TrashRowChunk renderKey={item.renderKey} key={item.key} spritesheetUrl={spritesheetUrl} x={item.x} y={item.y} tileSize={tileSize} width={item.width} tilesHeight={tilesHeight} />
            if (item.type === Chunks.Crack) return <Crack renderKey={item.renderKey} key={item.key} spritesheetUrl={spritesheetUrl} x={item.x} y={item.y} tileSize={tileSize} width={item.width} tilesHeight={tilesHeight} />
            if (item.type === Chunks.Monsters) return <MonstersRow renderKey={item.renderKey} key={item.key} spritesheetUrl={spritesheetUrl} x={item.x} y={item.y} tileSize={tileSize} width={item.width} tilesHeight={tilesHeight} />

            return (<Chunk
              changeLevelEvery={7}
              renderKey={item.renderKey}
              key={item.key}
              x={item.x}
              y={item.y}
              tileSize={tileSize}
              tilesHeight={tilesHeight}
              width={item.width}
              spritesheetUrl={spritesheetUrl}
            />)
          })
      }
      <Graphics draw={draw(chunks[chunks.length - 1].x, chunks[chunks.length - 1].y - tilesHeight * tileSize)}/>
      {isCollisionDetectorVisibile && <Body width={60} height={10000} x={chunks[chunks.length - 1].x + (chunks[chunks.length - 1].width * tileSize) / 4} y={0} options={SENSOR_OPTIONS} label="sensor" onCollision={onCollision} />}
    </LevelManagerContextProvider>
  )
}
