import { LandscapeBlockSize, LandscapeOffsetsType } from '../typings';

export const landscapeToSizes = (
  landscape: LandscapeOffsetsType,
  tileSize: number,
): LandscapeBlockSize[] =>
  landscape.reduce((acc, item, index, arr) => {
    if (index === 0) {
      return [{ width: tileSize, yOffset: 0 }];
    }

    if (item === arr[index - 1]) {
      acc[acc.length - 1].width += tileSize;
      return acc;
    }

    return [...acc, { width: tileSize, yOffset: item * tileSize }];
  }, [] as LandscapeBlockSize[]);
