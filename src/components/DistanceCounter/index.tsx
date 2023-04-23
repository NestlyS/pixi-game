import { useTick } from '@pixi/react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGlobalViewport } from '../GlobalViewport/context';
import { selectPageGamePauseState } from '../../redux/gamePage/selectors';
import { increaseDistanceCounter } from '../../redux/gamePage';

const DELTA = 10;

export const DistanceCounter = () => {
  const deltaRef = useRef(0);
  const isPaused = useSelector(selectPageGamePauseState);
  const viewport = useGlobalViewport();
  const prevX = useRef(0);
  const dispatch = useDispatch();

  useTick((delta) => {
    deltaRef.current += delta;

    if (isPaused || deltaRef.current < DELTA || !viewport.globalViewport?.x) return;

    deltaRef.current = 0;

    const raw = Math.floor(viewport.globalViewport.x - prevX.current) * -1;

    prevX.current = viewport.globalViewport.x;

    if (raw <= 0) return;

    dispatch(increaseDistanceCounter(raw));
  });

  return null;
};
