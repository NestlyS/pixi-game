import { Body } from 'matter-js';
import React, { useCallback, useEffect, useRef } from 'react';
import { useCatchSignal, SignalList } from '../../../utils/signaller/emitSignal';
import { useBody } from '../../Body/context';
import { useHealth } from '../../HealthStorage/context';
import { getBodyId } from '../../HealthStorage/utils';

type Props = {
  x: number;
  y: number;
};

export const ResetUserController = ({ x, y }: Props) => {
  const { body } = useBody();
  const { setHealth } = useHealth(getBodyId(body));
  const initialCoords = useRef({ x, y });

  const cb = useCallback(() => {
    if (!body) return;
    // TODO Подумать над переездом на стабильный body;

    console.log(body, body.position, initialCoords.current);
    Body.setPosition(body, initialCoords.current);
    Body.setVelocity(body, { x: 0, y: 0 });
  }, [body]);
  useCatchSignal(SignalList.Reset, cb);

  return null;
};
