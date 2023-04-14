import { LandscapeBlockSize, LandscapeParamsType } from '../typings';

export const sizesToParams = (
  sizes: LandscapeBlockSize[],
  globalX: number,
  globalY: number,
): LandscapeParamsType[] =>
  sizes.reduce((acc, item, index) => {
    if (index === 0) {
      acc.push({
        x: globalX,
        y: globalY + item.yOffset,
        width: item.width,
      });

      return acc;
    }

    acc.push({
      x: acc[acc.length - 1].x + acc[acc.length - 1].width,
      y: globalY - item.yOffset,
      width: item.width,
    });

    return acc;
  }, [] as LandscapeParamsType[]);
