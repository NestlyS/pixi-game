import { ChunkProps } from "../Chunk/typings"

export type ChunkParams = {
  x: number,
  width: number,
  y: number,
  key: number,
  renderKey: number,
  type: Chunks,
}

export enum Chunks {
  Row = 'row',
  Crack = 'crack',
  Monsters = 'monsters',
  Default = 'default',
  Boxes = 'boxes',
}

export type CustomChunkParams = {
  component: (props: ChunkProps) => React.ReactNode,
  width?: number,
}