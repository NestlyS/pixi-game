import isEqual from "lodash/isEqual";
import { memo } from "react";
import { render } from "react-dom";
import { Chunk } from "../Chunk";
import { TrashRowChunk } from "../Chunk/components/TrashRowChunk";
import { ChunkParams } from "./typings"

type Props = {
  chunks: ChunkParams[];
  tileSize: number;
  tilesHeight: number;
  chunkWidth: number;
  changeLevelEvery: number;
  spritesheetUrl: string;
}

export const ChunkRenderer = memo(({ chunks, tileSize, tilesHeight, chunkWidth, changeLevelEvery, spritesheetUrl }: Props) => {
  return <>{
          chunks
            .map(item => {
              return (<Chunk
                changeLevelEvery={changeLevelEvery}
                renderKey={item.renderKey}
                key={item.key}
                x={item.x}
                y={item.y}
                tileSize={tileSize}
                tilesHeight={tilesHeight}
                width={chunkWidth}
                spritesheetUrl={spritesheetUrl}
              />)
            })}
        </>
}, ( { chunks, ...prevProps }, { chunks: newChunks, ...nextProps } ) => isEqual(chunks, newChunks) && isEqual( prevProps, nextProps ));