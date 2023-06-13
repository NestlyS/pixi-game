import { Crack } from '../Chunk/components/Crack';
import { HealerChunk } from '../Chunk/components/Healer';
import { MonstersRow } from '../Chunk/components/MonstersRow';
import { Row } from '../Chunk/components/Row';
import { RowDown } from '../Chunk/components/RowDown';
import { RowUp } from '../Chunk/components/RowUp';
import { SpikesRow } from '../Chunk/components/SpikesRow';
import { TrashRowChunk } from '../Chunk/components/TrashRowChunk';

export enum Chunks {
  Row = 'row',
  Crack = 'crack',
  Monsters = 'monsters',
  Default = 'default',
  Up = 'up',
  Down = 'down',
  Healer = 'healer',
  Spikes = 'spikes',
}

export const Components = {
  [Chunks.Default]: Row,
  [Chunks.Down]: RowDown,
  [Chunks.Up]: RowUp,
  [Chunks.Row]: TrashRowChunk,
  [Chunks.Monsters]: MonstersRow,
  [Chunks.Crack]: Crack,
  [Chunks.Healer]: HealerChunk,
  [Chunks.Spikes]: SpikesRow,
};

export type ChunkParams = {
  type?: Chunks;
  x: number;
  width: number;
  y: number;
  key: number;
  renderKey: number;
  yDelta: number;
  component: (typeof Components)[keyof typeof Components];
};

export type CustomChunkParams = {
  width: number;
  heightDelta?: number;
  chance: number;
};
