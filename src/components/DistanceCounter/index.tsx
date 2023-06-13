import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGlobalViewport } from '../GlobalViewport/context';
import { selectPageGamePauseState } from '../../redux/gamePage/selectors';
import { increaseDistanceCounter } from '../../redux/gamePage';
import { useSlowerTick } from '../../utils/useSlowedTick';

const DELTA = 20;

export const DistanceCounter = () => {
  const isPaused = useSelector(selectPageGamePauseState);
  const viewport = useGlobalViewport();
  const prevX = useRef(0);
  const dispatch = useDispatch();

  useSlowerTick(() => {
    if (isPaused || !viewport.globalViewport?.x) return;

    const raw = Math.floor(viewport.globalViewport.x - prevX.current) * -1;

    prevX.current = viewport.globalViewport.x;

    if (raw <= 0) return;

    dispatch(increaseDistanceCounter(raw));
  }, DELTA);

  return null;
};
