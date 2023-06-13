import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseSpeedMult } from '../../../../../../redux/gamePage';
import {
  selectPageGameInitedState,
  selectPageGamePauseState,
} from '../../../../../../redux/gamePage/selectors';

const SPEED_UP_INTERVAL = 10000;
const SPEED_UP_AMOUNT = 0.05;

export const SpeedMultiplier = () => {
  const isPaused = useSelector(selectPageGamePauseState);
  const isInited = useSelector(selectPageGameInitedState);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setInterval(() => dispatch(increaseSpeedMult(SPEED_UP_AMOUNT)), SPEED_UP_INTERVAL);
    return () => clearInterval(id);
  }, [dispatch, isInited, isPaused]);

  return null;
};
