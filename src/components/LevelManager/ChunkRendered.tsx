import isEqual from "lodash/isEqual";
import { memo } from "react";
import { Chunk } from "../Chunk";
import { ChunkParams } from "./typings"

type Props = {
  chunks: ChunkParams[];
  tileSize: number;
  tilesHeight: number;
  chunkWidth: number;
}

export const ChunkRenderer = memo(({ chunks, tileSize, tilesHeight, chunkWidth }: Props) => {
  return <>{chunks.map(item =>  <Chunk renderKey={item.renderKey} key={item.key} x={item.x} y={item.y} tileSize={tileSize} tilesHeight={tilesHeight} width={chunkWidth}/>)}</>
}, ( { chunks, ...prevProps }, { chunks: newChunks, ...nextProps } ) => isEqual(chunks, newChunks) && isEqual( prevProps, nextProps ));