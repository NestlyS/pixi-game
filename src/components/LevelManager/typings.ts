import { ReactElement } from "react"
import { JsxElement } from "typescript"
import { BoxesChunk } from "../Chunk/components/Boxes"
import { Crack } from "../Chunk/components/Crack"
import { MonstersRow } from "../Chunk/components/MonstersRow"
import { Row } from "../Chunk/components/Row"
import { RowDown } from "../Chunk/components/RowDown"
import { RowUp } from "../Chunk/components/RowUp"
import { TrashRowChunk } from "../Chunk/components/TrashRowChunk"
import { ChunkProps } from "../Chunk/typings"

type Components = typeof Row | typeof RowDown | typeof RowUp | typeof TrashRowChunk | typeof MonstersRow | typeof Crack | typeof BoxesChunk;

export type ChunkParams = {
  type?: Chunks;
  x: number,
  width: number,
  y: number,
  key: number,
  renderKey: number,
  yDelta: number,
  component: Components,
}

export enum Chunks {
  Row = 'row',
  Crack = 'crack',
  Monsters = 'monsters',
  Default = 'default',
  Up = 'up',
  Down = 'down',
  Boxes = 'boxes',
}

export type CustomChunkParams = {
  component: Components,
  width?: number,
  heightDelta?: number,
}