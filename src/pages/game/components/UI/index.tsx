import { Container, useApp } from '@pixi/react';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GameOverScreen } from './components/GameOverScreen';
import { InGameUI } from './components/InGameUI';
import { CharacterSelectUI } from '../../../../components/ui/CharacterSelectUI';

import { SignalList, useCatchSignal } from '../../../../utils/signaller/emitSignal';
import { selectPageGameCurrentPage } from '../../../../redux/gamePage/selectors';
import { Pages } from '../../../../redux/gamePage/typings';
import { setGamePage } from '../../../../redux/gamePage';
import { UI_SPRITESHEET_URL } from '../../../../constants';
import { TutorialInGameUI } from './components/TutorialInGameUI';
import { InGameNovelUI } from './components/InGameNovelUI';

export const MENU_BUTTON_NAME = 'menu button.png';

const getPage = (page: Pages) => {
  switch (page) {
    case Pages.GameOver:
      return (
        <GameOverScreen spritesheetUrl={UI_SPRITESHEET_URL} menuButtonName={MENU_BUTTON_NAME} />
      );
    case Pages.Main:
      return <InGameUI />;
    case Pages.TutorialStart:
    case Pages.TutorialJump:
    case Pages.TutorialAttack:
    case Pages.Tutorial:
      return <TutorialInGameUI />;
    case Pages.CharacterSelect:
      return <CharacterSelectUI />;
    case Pages.Novel:
      return <InGameNovelUI />;
  }
};

type Props = {
  x?: number;
  y?: number;
};

export const UI = ({ x = 0, y = 0 }: Props) => {
  const app = useApp();
  const page = useSelector(selectPageGameCurrentPage);
  const dispatch = useDispatch();
  const width = useMemo(() => {
    return app.screen.width;
  }, [app.screen.width]);

  const onGameOver = useCallback(() => dispatch(setGamePage(Pages.GameOver)), [dispatch]);
  useCatchSignal(SignalList.GameOver, onGameOver);

  const onReset = useCallback(() => setGamePage(Pages.CharacterSelect), []);
  useCatchSignal(SignalList.Reset, onReset);

  return (
    <Container x={x} y={y} width={width} zIndex={10}>
      {getPage(page)}
    </Container>
  );
};
