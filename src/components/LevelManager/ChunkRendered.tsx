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
  spritesheetUrl: string;
}

export const ChunkRenderer = memo(({ chunks, tileSize, tilesHeight, chunkWidth, changeLevelEvery, spritesheetUrl }: Props) => {
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
                spritesheetUrl={spritesheetUrl}
              />
            )}
        </>
}, ( { chunks, ...prevProps }, { chunks: newChunks, ...nextProps } ) => isEqual(chunks, newChunks) && isEqual( prevProps, nextProps ));