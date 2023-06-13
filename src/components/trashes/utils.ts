import { TrashTypes } from '../../redux/mainUser/typings';
import { getRandomValue } from '../../utils/getRandomValue';
import { Bottle } from './Bottle';
import { Chips } from './Chips';
import { Paper } from './Paper';

export type ExtendedTrashTypes = TrashTypes | 'random';

const getRandomTrash = () => {
  const rnd = getRandomValue(0, 2);
  return [Chips, Paper, Bottle][rnd];
};

const getTrashComponent = (type: ExtendedTrashTypes) => {
  if (type === 'random') return getRandomTrash();

  switch (type) {
    case 'bottle':
      return Bottle;
    case 'chips':
      return Chips;
    case 'paper':
      return Paper;
  }
};

export const getRandowmTrashComponents = (amount: number, type: ExtendedTrashTypes = 'random') =>
  new Array(amount).fill(0).map(() => getTrashComponent(type));
