import { Chunk } from '../Chunk';
import { BoxesChunk, BOXES_ROW_WIDTH } from '../Chunk/components/Boxes';
import { Crack, CRACK_ROW_WIDTH } from '../Chunk/components/Crack';
import { MonstersRow, MONSTERS_ROW_WIDTH } from '../Chunk/components/MonstersRow';
import { Row } from '../Chunk/components/Row';
import { RowDown } from '../Chunk/components/RowDown';
import { RowUp } from '../Chunk/components/RowUp';
import { ROW_WIDTH, TrashRowChunk } from '../Chunk/components/TrashRowChunk';
import { Chunks, CustomChunkParams } from './typings';

export const CHUNKS_TYPE: Record<Chunks, CustomChunkParams> = {
  [Chunks.Row]: {
    component: TrashRowChunk,
    width: ROW_WIDTH,
  },
  [Chunks.Crack]: {
    component: Crack,
    width: CRACK_ROW_WIDTH,
  },
  [Chunks.Default]: {
    component: Row,
    width: ROW_WIDTH,
  },
  [Chunks.Up]: {
    component: RowUp,
    heightDelta: 1,
    width: ROW_WIDTH,
  },
  [Chunks.Down]: {
    component: RowDown,
    heightDelta: -1,
    width: ROW_WIDTH,
  },
  [Chunks.Monsters]: {
    component: MonstersRow,
    width: MONSTERS_ROW_WIDTH,
  },
  [Chunks.Boxes]: {
    component: BoxesChunk,
    width: BOXES_ROW_WIDTH,
  },
};
