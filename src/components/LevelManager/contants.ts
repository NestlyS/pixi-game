import { Chunk } from "../Chunk"
import { Crack, CRACK_ROW_WIDTH } from "../Chunk/components/Crack"
import { MonstersRow, MONSTERS_ROW_WIDTH } from "../Chunk/components/MonstersRow"
import { ROW_WIDTH, TrashRowChunk } from "../Chunk/components/TrashRowChunk"
import { Chunks, CustomChunkParams } from "./typings"


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
    component: Chunk,
  },
  [Chunks.Monsters]: {
    component: MonstersRow,
    width: MONSTERS_ROW_WIDTH,
  }
}