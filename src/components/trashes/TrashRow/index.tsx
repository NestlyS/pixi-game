import React, { useMemo } from 'react';
import { getRandomValue } from '../../../utils/getRandomValue';
import { Bottle } from '../Bottle';
import { Chips } from '../Chips';
import { Paper } from '../Paper';
import { ExtendedTrashTypes, getRandowmTrashComponents } from '../utils';

type Props = {
  x: number;
  y: number;
  tileSize: number;
  width: number;
  type: ExtendedTrashTypes;
  renderKey?: number | string | null;
};

export const TrashRow = ({ width, type, x, y, tileSize, renderKey }: Props) => {
  const filler = useMemo<(typeof Chips | typeof Bottle | typeof Paper)[]>(
    () => getRandowmTrashComponents(width, type),
    [type, width],
  );

  return (
    <>
      {filler.map((Component, _x) => (
        <Component key={`${_x}_${renderKey}`} x={x + _x * tileSize} y={y} />
      ))}
    </>
  );
};
