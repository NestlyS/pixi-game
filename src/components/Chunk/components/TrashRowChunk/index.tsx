import { Grass } from '../../../TileGround/components/Grass/Grass';
import { TrashRow } from '../../../trashes/TrashRow';
import { ChunkProps } from '../../typings';

export const ROW_WIDTH = 8;

export const TrashRowChunk = ({
  spritesheetUrl,
  x,
  y,
  tileSize,
  tilesHeight,
  width = ROW_WIDTH,
  renderKey,
}: ChunkProps) => {
  return (
    <>
      <TrashRow x={x + tileSize} y={y - ((tilesHeight + 1) * tileSize / 2)} tileSize={tileSize} width={width - 2} type="random" renderKey={renderKey}/>
      <Grass spritesheetUrl={spritesheetUrl} x={x + width * tileSize / 2} y={y} tileSize={tileSize} tilesWidth={width} tilesHeight={tilesHeight} />
    </>
  )
}
