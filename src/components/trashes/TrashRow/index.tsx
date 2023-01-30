import React, { useMemo } from 'react'
import { getRandomValue } from '../../../utils/getRandomValue';
import { TrashTypes } from '../../TrashStorage/typings';
import { Bottle } from '../Bottle';
import { Chips } from '../Chips';
import { Paper } from '../Paper';

type Props = {
  x: number,
  y: number,
  tileSize: number,
  width: number,
  type: TrashTypes | 'random';
  renderKey?: number | string | null;
}


const getRandomTrash = () => {
  const rnd = getRandomValue(0, 2);
  return [Chips, Paper, Bottle][rnd];
}

const getTrashComponent = (type: Props['type']) => {
  if (type === 'random') return getRandomTrash();

  switch(type) {
    case 'bottle': return Bottle;
    case 'chips': return Chips;
    case 'paper': return Paper;
  }
}


export const TrashRow = ({
  width,
  type,
  x,
  y,
  tileSize,
  renderKey,
}: Props) => {
  const filler = useMemo<(typeof Chips | typeof Bottle | typeof Paper)[]>(() => (new Array(width)).fill(0).map(() => getTrashComponent(type)), [type, width]);

  return (<>
    {
      filler.map((Component, _x) => <Component key={`${_x}_${renderKey}`} x={x + _x * tileSize} y={y} />)
    }
  </>)
}
