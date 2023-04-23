import { Body } from 'matter-js';
import { useCallback, useRef } from 'react';
import { useCatchSignal, SignalList } from '../../../../utils/signaller/emitSignal';
import { useBody } from '../../../Body/context';

type Props = {
  x: number;
  y: number;
};

export const ResetUserController = ({ x, y }: Props) => {
  const { body } = useBody();
  const initialCoords = useRef({ x, y });

  const cb = useCallback(() => {
    Body.setPosition(body, initialCoords.current);
    Body.setVelocity(body, { x: 0, y: 0 });
  }, [body]);
  useCatchSignal(SignalList.Reset, cb);

  return null;
};
