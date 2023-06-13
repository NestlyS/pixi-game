import { useTick } from '@pixi/react';
import { useRef } from 'react';

export const useSlowerTick = (cb: (delta: number) => void, minDeltaToCall: number) => {
  const deltaRef = useRef(0);

  useTick((delta) => {
    deltaRef.current += delta;

    if (deltaRef.current < minDeltaToCall) return;

    deltaRef.current = 0;
    cb(delta);
  });
};
