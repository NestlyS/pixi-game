import { CRACK_ROW_WIDTH } from '../Chunk/components/Crack';
import { HEALER_ROW_WIDTH } from '../Chunk/components/Healer';
import { MONSTERS_ROW_WIDTH } from '../Chunk/components/MonstersRow';
import { ROW_WIDTH } from '../Chunk/components/TrashRowChunk';
import { Chunks, Components, CustomChunkParams } from './typings';

export const CHUNKS_TYPE: Record<Chunks, CustomChunkParams> = {
  [Chunks.Row]: {
    width: ROW_WIDTH,
    chance: 15,
  },
  [Chunks.Crack]: {
    width: CRACK_ROW_WIDTH,
    chance: 20,
  },
  [Chunks.Default]: {
    width: ROW_WIDTH,
    chance: 30,
  },
  [Chunks.Up]: {
    heightDelta: 1,
    width: ROW_WIDTH,
    chance: 30,
  },
  [Chunks.Down]: {
    heightDelta: -1,
    width: ROW_WIDTH,
    chance: 30,
  },
  [Chunks.Monsters]: {
    width: MONSTERS_ROW_WIDTH,
    chance: 15,
  },
  [Chunks.Healer]: {
    width: HEALER_ROW_WIDTH,
    chance: 10,
  },
};

export const CHANCES = Object.values(CHUNKS_TYPE).map(({ chance }) => chance);
export const MAX_CHANCES = Object.entries(CHUNKS_TYPE).reduce(
  (acc, [value, { chance }]) => [...acc, [chance + Number(acc[acc.length - 1]?.[0] ?? 0), value]],
  [] as (number | string)[][],
);
export const SUM_CHANCES = Object.values(CHUNKS_TYPE).reduce((acc, { chance }) => acc + chance, 0);

export const initialState = (x: number, y: number) => [
  {
    type: Chunks.Row,
    component: Components[Chunks.Row],
    yDelta: 0,
    key: 1,
    renderKey: 1,
    x,
    width: 8,
    y,
  },
];
