import React, { memo, useEffect, useMemo } from 'react';
import { useLevelManager } from '../LevelManager/context';
import { ChunkProps } from './typings';
import { generateLandscape } from './utils/generateLandscape';
import { landscapeToSizes } from './utils/landscapeToSizes';
import { sizesToParams } from './utils/sizesToParams';
import { percents } from './contants';
import { paramsToElements } from './utils/paramsToElements';

export const Chunk = memo(({
  width,
  renderKey = 0,
  changeLevelEvery = 5,
  tileSize,
  x,
  y,
  tilesHeight,
  spritesheetUrl,
}: ChunkProps) => {
  const {
    setLastBlockOffset
  } = useLevelManager();

  const landscape = useMemo(() => generateLandscape(width, percents, changeLevelEvery), [width, renderKey, changeLevelEvery]);

  useEffect(() => {
    if (!landscape) return;

    setLastBlockOffset(landscape[landscape.length - 1]);
  }, [landscape]);

  const elements = useMemo(() =>
    paramsToElements({
      params: sizesToParams(
        landscapeToSizes(
          landscape,
          tileSize
        ),
        x,
        y,
        tileSize
      ),
      tilesHeight,
      tileSize,
      spritesheetUrl
    }), [landscape, spritesheetUrl, tileSize, tilesHeight, x, y]);

  console.log(elements);
  return (<>
    { elements }
  </>);
});
