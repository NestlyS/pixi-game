import isEqual from "lodash/isEqual";
import { memo } from "react";
import { Chunk } from "../Chunk";
import { ChunkParams } from "./typings"

type Props = {
  chunks: ChunkParams[];
  tileSize: number;
  tilesHeight: number;
  chunkWidth: number;
  changeLevelEvery: number;
}

export const ChunkRenderer = memo(({ chunks, tileSize, tilesHeight, chunkWidth, changeLevelEvery }: Props) => {
  return <>{
          chunks
            .map(item =>
              <Chunk
                changeLevelEvery={changeLevelEvery}
                renderKey={item.renderKey}
                key={item.key}
                x={item.x}
                y={item.y}
                tileSize={tileSize}
                tilesHeight={tilesHeight}
                width={chunkWidth}
              />
            )}
        </>
}, ( { chunks, ...prevProps }, { chunks: newChunks, ...nextProps } ) => isEqual(chunks, newChunks) && isEqual( prevProps, nextProps ));