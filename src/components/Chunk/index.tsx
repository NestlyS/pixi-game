import React, { memo, useEffect, useMemo } from 'react';
import { Body } from '../Body';
import { DIRT_MIDDLE_PART_NAME, DIRT_TO_GRASS_NAME, Grass, GRASS_TO_DIRT_NAME, MIDDLE_PART_NAME } from '../TileGround/Grass';
import { useLevelManager } from '../LevelManager/context';
import { LandscapeParamsType, ModifiedGrassProps, PercentTypes } from './typings';
import { generateLandscape } from './utils/generateLandscape';
import { landscapeToSizes } from './utils/landscapeToSizes';
import { sizesToParams } from './utils/sizesToParams';
import { percents } from './contants';
import { paramsToElements } from './utils/paramsToElements';


type Props = {
  width: number;
  renderKey?: number | string;
} & ModifiedGrassProps

export const Chunk = memo(({
  width,
  renderKey = 0,
  ...grassProps
}: Props) => {
  const {
    setLastBlockOffset
  } = useLevelManager();

  const landscape = useMemo(() => generateLandscape(width, percents, 7), [width, renderKey]);

  useEffect(() => {
    if (!landscape) return;

    setLastBlockOffset(landscape[landscape.length - 1]);
  }, [landscape]);

  const elements = useMemo(() =>
    paramsToElements(
      sizesToParams(
        landscapeToSizes(
          landscape,
          grassProps.tileSize
        ),
        grassProps.x,
        grassProps.y,
        grassProps.tileSize
      ),
      grassProps
    ), [grassProps, landscape]);

  console.log(elements);
  return (<>
    { elements }
  </>);
});
