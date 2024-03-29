import React, { memo, useEffect, useMemo } from 'react';
import { useLevelManager } from '../LevelManager/context';
import { ChunkProps } from './typings';
import { generateLandscape } from './utils/generateLandscape';
import { landscapeToSizes } from './utils/landscapeToSizes';
import { sizesToParams } from './utils/sizesToParams';
import { percents } from './contants';
import { paramsToElements } from './utils/paramsToElements';

export const Chunk = memo(
  ({ width, changeLevelEvery = 5, tileSize, x, y, tilesHeight, spritesheetUrl }: ChunkProps) => {
    const { setLastBlockOffset } = useLevelManager();

    const landscape = useMemo(
      () => generateLandscape(width, percents, changeLevelEvery),
      [width, changeLevelEvery],
    );

    useEffect(() => {
      if (!landscape) return;

      setLastBlockOffset(landscape[landscape.length - 1]);
    }, [landscape, setLastBlockOffset]);

    const elements = useMemo(
      () =>
        paramsToElements({
          params: sizesToParams(landscapeToSizes(landscape, tileSize), x, y),
          tilesHeight,
          tileSize,
          spritesheetUrl,
        }),
      [landscape, spritesheetUrl, tileSize, tilesHeight, x, y],
    );

    return <>{elements}</>;
  },
);
