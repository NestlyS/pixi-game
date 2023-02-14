import { getRandomValue } from '../../../utils/getRandomValue';
import { LandscapeOffsetsType, PercentMapType, PercentTypes } from '../typings';
import { countLastNumberOfRepeat } from './countLastNumberOfRepeat';

export const generateLandscape = (
  width: number,
  percents: PercentMapType,
  blocksBeforeTerrainChange: number = 3,
): LandscapeOffsetsType =>
  new Array(width).fill(0).reduce((acc) => {
    const random = getRandomValue(0, 100);

    const value = Object.entries(percents).find(([percent]) => random < Number(percent));

    const addNewLandscapeValue = (value: number = 0) => [
      ...acc,
      (acc.length ? acc[acc.length - 1] : 0) + value,
    ];

    if (!value) {
      return addNewLandscapeValue();
    }

    if (value[1] === PercentTypes.Stay) {
      return addNewLandscapeValue();
    }

    if (acc.length < 3) {
      return addNewLandscapeValue();
    }

    if (countLastNumberOfRepeat(acc) > blocksBeforeTerrainChange) {
      return addNewLandscapeValue(value[1] === PercentTypes.Down ? -1 : 1);
    }

    return addNewLandscapeValue();
  }, []);
