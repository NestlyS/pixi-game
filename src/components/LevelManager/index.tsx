import { useCallback, useRef, useState } from 'react';
import { ChunkParams } from './typings';
import { USER_BODY_GROUP } from '../../bodyGroups/user';
import { appendChunk, cleanChunks } from './utils';
import { initialState } from './contants';
import { VerticalSensor } from '../VerticalSensor';
import { Container } from '@pixi/react';

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

  const onCollision = useCallback(() => {
    if (!isCollisionDetectorVisibile.current) return;
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
  }, [chunkWidth, chunks, sensorPosition, tileSize]);

  return (
    <Container sortableChildren>
      {chunks.map((item, index, arr) => (
        <item.component
          key={item.key}
          width={item.width}
          tileSize={tileSize}
          tilesHeight={tilesHeight}
          x={item.x}
          y={item.y}
          spritesheetUrl={spritesheetUrl}
          zIndex={arr.length - 1 - index}
        />
      ))}
      <VerticalSensor x={sensorPosition} y={0} onCollision={onCollision} isUserCollisionOnly />
    </Container>
  );
};
