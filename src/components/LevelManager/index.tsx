import React, { useCallback, useMemo, useState } from 'react';
import { Graphics} from '@inlet/react-pixi';
import { Graphics as PIXI_Grapics } from 'pixi.js';
import { Body } from '../Body'
import { LevelManagerContextProvider } from './context'
import { ChunkParams } from './typings';
import { ChunkRenderer } from './ChunkRendered';

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
      key: 1,
      renderKey: 1,
      x,
      y,
    }
  ]);

  const draw = useCallback((x: number, y: number) => (g: PIXI_Grapics) => {
    g.beginFill(0x5533cc, 1);
    g.drawRoundedRect(x, y, 80, 80, 15);
    g.endFill();
  }, []);


  const onCollision = useCallback(
    () => {
      console.log('------SENSOR!!!------');
      setCollisionDetectorVisibility(false);
      const newChunks = [...chunks];

      newChunks.push(
        {
          renderKey: newChunks[newChunks.length - 1].renderKey + 1,
          key: newChunks[newChunks.length - 1].key === 1 ? 2 : 1,
          x: newChunks[newChunks.length - 1].x + chunkWidth * tileSize,
          y: newChunks[newChunks.length - 1].y - lastBlockOffset * tileSize,
        }
      )

      if (newChunks.length > 2) {
        newChunks.shift();
      }
      console.log('------SENSOR!!!------', chunks);

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
      <ChunkRenderer tileSize={tileSize} tilesHeight={tilesHeight} chunkWidth={chunkWidth} chunks={chunks} changeLevelEvery={10} spritesheetUrl={spritesheetUrl}/>
      <Graphics draw={draw(chunks[chunks.length - 1].x, chunks[chunks.length - 1].y - tilesHeight * tileSize)}/>
      {isCollisionDetectorVisibile && <Body width={60} height={10000} x={chunks[chunks.length - 1].x + (chunkWidth * tileSize) / 4} y={0} options={SENSOR_OPTIONS} label="sensor" onCollision={onCollision} />}
    </LevelManagerContextProvider>
  )
}
