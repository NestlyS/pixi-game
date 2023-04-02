import { getRandomValue } from '../../utils/getRandomValue';
import { CHUNKS_TYPE, MAX_CHANCES, SUM_CHANCES } from './contants';
import { ChunkParams, Chunks, Components } from './typings';

type GenerateChunkType = (prevChunk: ChunkParams, tileSize: number) => ChunkParams | undefined;

const generateChunk: GenerateChunkType = (prevChunk, tileSize) => {
  const randomValue = getRandomValue(0, SUM_CHANCES);
  const randomType = MAX_CHANCES.find(([chance, value]) => randomValue < Number(chance));
  if (!randomType || !randomType[1]) return;

  const type = randomType[1] as Chunks;

  const randomParams = CHUNKS_TYPE[type];

  console.log('RANDOM', randomValue, randomType, randomParams);

  return {
    type,
    component: Components[type],
    renderKey: prevChunk.renderKey + 1,
    key: prevChunk.key + 1,
    x: prevChunk.x + prevChunk.width * tileSize,
    y: prevChunk.y - prevChunk.yDelta * tileSize,
    yDelta: randomParams.heightDelta ?? 0,
    width: randomParams.width,
  };
};

export const appendChunk = ({
  chunks,
  tileSize,
  chunkWidth,
  sensorPosition,
}: {
  chunks: ChunkParams[];
  tileSize: number;
  chunkWidth: number;
  sensorPosition: number;
}): ChunkParams[] => {
  const newChunk = generateChunk(chunks[chunks.length - 1], tileSize);

  if (!newChunk)
    return appendChunk({
      chunks,
      tileSize,
      chunkWidth,
      sensorPosition,
    });

  const newChunks = [...chunks, newChunk];
  const lastElement = newChunks[newChunks.length - 1];

  if (lastElement.x + lastElement.width * tileSize > sensorPosition + chunkWidth * tileSize)
    return newChunks;

  return appendChunk({
    chunks: newChunks,
    tileSize,
    chunkWidth,
    sensorPosition,
  });
};

export const cleanChunks = ({
  chunks,
  chunkWidth,
  sensorPosition,
  tileSize,
}: {
  chunks: ChunkParams[];
  chunkWidth: number;
  sensorPosition: number;
  tileSize: number;
}): ChunkParams[] =>
  chunks.filter((item) => {
    console.log(
      'CHARACTER',
      item.x + item.width * tileSize,
      sensorPosition - (chunkWidth * tileSize) / 2,
      sensorPosition,
    );
    return item.x + item.width * tileSize > sensorPosition - (chunkWidth * tileSize) / 2;
  });
