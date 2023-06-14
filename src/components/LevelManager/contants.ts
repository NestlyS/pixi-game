import { CRACK_ROW_WIDTH } from '../Chunk/components/Crack';
import { HEALER_ROW_WIDTH } from '../Chunk/components/Healer';
import { MONSTERS_ROW_WIDTH } from '../Chunk/components/MonstersRow';
import { SPIKES_ROW_WIDTH } from '../Chunk/components/SpikesRow';
import { ROW_WIDTH } from '../Chunk/components/TrashRowChunk';
import { Chunks, Components, CustomChunkParams } from './typings';

export const CHUNKS_TYPE: Record<Chunks, CustomChunkParams> = {
  [Chunks.Row]: {
    width: ROW_WIDTH,
    chance: 10,
  },
  [Chunks.Crack]: {
    width: CRACK_ROW_WIDTH,
    chance: 20,
  },
  [Chunks.Default]: {
    width: ROW_WIDTH,
    chance: 10,
  },
  [Chunks.Up]: {
    heightDelta: 1,
    width: ROW_WIDTH,
    chance: 5,
  },
  [Chunks.Down]: {
    heightDelta: -1,
    width: ROW_WIDTH,
    chance: 5,
  },
  [Chunks.Monsters]: {
    width: MONSTERS_ROW_WIDTH,
    chance: 15,
  },
  [Chunks.Healer]: {
    width: HEALER_ROW_WIDTH,
    chance: 2,
  },
  [Chunks.Spikes]: {
    width: SPIKES_ROW_WIDTH,
    chance: 15,
  },
};

export const CHANCES = Object.values(CHUNKS_TYPE).map(({ chance }) => chance);
export const GET_MAX_CHANCES = (filter?: Chunks) =>
  Object.entries(CHUNKS_TYPE)
    .filter(([val]) => val !== filter)
    .reduce(
      (acc, [value, { chance }]) => [
        ...acc,
        [chance + Number(acc[acc.length - 1]?.[0] ?? 0), value],
      ],
      [] as (number | string)[][],
    );
export const GET_SUM_CHANCES = (filter?: Chunks) =>
  Object.entries(CHUNKS_TYPE)
    .filter(([val]) => val !== filter)
    .map((val) => val[1])
    .reduce((acc, { chance }) => acc + chance, 0);

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
