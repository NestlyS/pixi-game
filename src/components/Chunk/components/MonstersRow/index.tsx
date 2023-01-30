import { useMemo } from 'react';
import { getRandomValue } from '../../../../utils/getRandomValue';
import { Monster } from '../../../Monster';
import { Grass } from '../../../TileGround/components/Grass/Grass';
import { ChunkProps } from '../../typings';

export const MONSTERS_ROW_WIDTH = 8;

export const MonstersRow = ({
  spritesheetUrl,
  x,
  y,
  tileSize,
  tilesHeight,
  width = MONSTERS_ROW_WIDTH,
  renderKey,
}: ChunkProps) => {
  const monstersX = useMemo(() => (new Array(getRandomValue(0, 2))).fill(0).map((_, index, { length }) => x + (width / length * 2) + (width * index / 2)), [width, x]);

  return (
    <>
      {monstersX.map(x => <Monster x={x} y={y - ((tilesHeight + 1) * tileSize / 2)} />)}
      <Grass spritesheetUrl={spritesheetUrl} x={x + width * tileSize / 2} y={y} tileSize={tileSize} tilesWidth={width} tilesHeight={tilesHeight} />
    </>
  )
}
