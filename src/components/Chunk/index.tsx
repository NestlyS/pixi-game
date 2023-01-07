import React, { memo, useEffect, useMemo } from 'react';
import { useLevelManager } from '../LevelManager/context';
import { ModifiedGrassProps } from './typings';
import { generateLandscape } from './utils/generateLandscape';
import { landscapeToSizes } from './utils/landscapeToSizes';
import { sizesToParams } from './utils/sizesToParams';
import { percents } from './contants';
import { paramsToElements } from './utils/paramsToElements';


type Props = {
  width: number;
  renderKey?: number | string;
  changeLevelEvery?: number;
} & ModifiedGrassProps

export const Chunk = memo(({
  width,
  renderKey = 0,
  changeLevelEvery = 5,
  ...grassProps
}: Props) => {
  const {
    setLastBlockOffset
  } = useLevelManager();

  const landscape = useMemo(() => generateLandscape(width, percents, changeLevelEvery), [width, renderKey, changeLevelEvery]);

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
