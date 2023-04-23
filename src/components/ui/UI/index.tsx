import { Container, useApp } from '@pixi/react';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GameOverScreen } from '../GameOverScreen';
import { InGameUI } from '../InGameUI';
import { CharacterSelectUI } from '../CharacterSelectUI';

import { SignalList, useCatchSignal } from '../../../utils/signaller/emitSignal';
import { selectPageGameCurrentPage } from '../../../redux/gamePage/selectors';
import { Pages } from '../../../redux/gamePage/typings';
import { setPage } from '../../../redux/gamePage';

export const UI_SPRITESHEET = './sprites/menuAtlas.json';
export const MENU_BUTTON_NAME = 'menu button.png';

const getPage = (page: Pages) => {
  switch (page) {
    case Pages.GameOver:
      return <GameOverScreen spritesheetUrl={UI_SPRITESHEET} menuButtonName={MENU_BUTTON_NAME} />;
    case Pages.Main:
      return <InGameUI />;
    case Pages.CharacterSelect:
      return <CharacterSelectUI />;
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

  const onGameOver = useCallback(() => dispatch(setPage(Pages.GameOver)), [dispatch]);
  useCatchSignal(SignalList.GameOver, onGameOver);

  const onReset = useCallback(() => setPage(Pages.CharacterSelect), []);
  useCatchSignal(SignalList.Reset, onReset);

  return (
    <Container x={x} y={y} width={width} zIndex={10}>
      {getPage(page)}
    </Container>
  );
};
