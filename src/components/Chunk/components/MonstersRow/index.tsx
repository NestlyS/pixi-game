import { useCallback, useMemo } from 'react';
import { getRandomValue } from '../../../../utils/getRandomValue';
import { Body } from '../../../Body';
import { Monster } from '../../../Monster';
import { MIDDLE_PART_NAME, DIRT_MIDDLE_PART_NAME } from '../../../TileGround/components/Grass/contants';
import { Grass } from '../../../TileGround/components/Grass/Grass';
import { ChunkProps } from '../../typings';

export const AI_SENSOR_OPTIONS: Matter.IChamferableBodyDefinition = {
  isStatic: true,
  isSensor: true,
  friction: 0,
}

export const MONSTERS_ROW_WIDTH = 10;

export const MonstersRow = ({
  spritesheetUrl,
  x,
  y,
  tileSize,
  tilesHeight,
  width = MONSTERS_ROW_WIDTH,
  renderKey,
}: ChunkProps) => {
  const monstersX = useMemo(() => (new Array(getRandomValue(0, 1))).fill(0).map((_, index, { length }) => x + (width / length * 2) + (width * index / 2)), [width, x]);
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
      {monstersX.map(x => <Monster x={x} y={y - ((tilesHeight + 1) * tileSize / 2)} />)}
      <Body
        label="ai-sensor"
        x={x}
        y={y - (tilesHeight * tileSize) / 2}
        width={tileSize}
        height={tileSize * 4}
        options={AI_SENSOR_OPTIONS}
      />
      <Grass textureModifier={textureModifier} spritesheetUrl={spritesheetUrl} x={x + width * tileSize / 2} y={y} tileSize={tileSize} tilesWidth={width} tilesHeight={tilesHeight} />
      <Body
        label="ai-sensor"
        x={x + width * tileSize}
        y={y - (tilesHeight * tileSize) / 2}
        width={tileSize}
        height={tileSize * 4}
        options={AI_SENSOR_OPTIONS}
      />
    </>
  )
}
