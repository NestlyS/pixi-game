import { useCallback } from 'react';
import { Box } from '../../../Box';
import { MIDDLE_PART_NAME, RIGHT_EDGE_NAME, DIRT_RIGHT_EDGE_NAME, DIRT_MIDDLE_PART_NAME } from '../../../TileGround/components/Grass/contants';
import { Grass } from '../../../TileGround/components/Grass/Grass';
import { TrashRow } from '../../../trashes/TrashRow';
import { ChunkProps } from '../../typings';

export const BOXES_ROW_WIDTH = 5;

export const BoxesChunk = ({
  spritesheetUrl,
  x,
  y,
  tileSize,
  tilesHeight,
  width = BOXES_ROW_WIDTH,
  renderKey,
}: ChunkProps) => {
  const textureModifier = useCallback(
    (indexX: number, indexY: number, length: number, height: number) => {
      if (indexY === 0 && indexX <= length - 1) {
        return MIDDLE_PART_NAME;
      }

      return DIRT_MIDDLE_PART_NAME;
    },
    [],
  )

  return (
    <>
      <Box x={x + (width * (tileSize - 1)) / 2} y={y - (tilesHeight * (tileSize + 1)) / 2} width={tileSize} height={tileSize} />
      <Box x={x + (width * (tileSize + 1)) / 2} y={y - (tilesHeight * (tileSize + 1)) / 2} width={tileSize * 2} height={tileSize * 2} />
      <Grass textureModifier={textureModifier} spritesheetUrl={spritesheetUrl} x={x + width * tileSize / 2} y={y} tileSize={tileSize} tilesWidth={width} tilesHeight={tilesHeight} />
    </>
  )
}
