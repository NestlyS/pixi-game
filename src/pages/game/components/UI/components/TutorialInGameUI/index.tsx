import { Text, Container } from '@pixi/react';
import { useDispatch, useSelector } from 'react-redux';

import { PIXEL_FONT } from '../../../../../../constants';
import {
  selectPageGameInitedState,
  selectPageGamePauseState,
} from '../../../../../../redux/gamePage/selectors';
import { Sounds } from '../../../../../../utils/soundController';
import { useBackgroundMusic } from '../../../../../../utils/useBackgroundMusic';
import { TutorialControls } from './components/TutorialControls';
import { useCallback } from 'react';
import { initGame, setGamePage, setPlay } from '../../../../../../redux/gamePage';
import { TutorialScreenHub } from './components/TutorialScreenHub';
import { Pages } from '../../../../../../redux/gamePage/typings';

export const TutorialInGameUI = () => {
  const isPaused = useSelector(selectPageGamePauseState);
  const isInited = useSelector(selectPageGameInitedState);
  const dispatch = useDispatch();

  useBackgroundMusic(Sounds.GameMusic, isPaused && isInited);

  const onEnd = useCallback(
    (cb?: () => void) => {
      if (!isInited) dispatch(initGame());
      dispatch(setGamePage(Pages.Tutorial));
      dispatch(setPlay());
      setTimeout(() => cb?.(), 100);
    },
    [dispatch, isInited],
  );

  return (
    <Container>
      <Text x={90} y={10} text="Ева" style={PIXEL_FONT} />
      <TutorialControls />
      <TutorialScreenHub onEnd={onEnd} />
      {/* isInited && <Menu /> */}
    </Container>
  );
};
