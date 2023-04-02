import { Container, useApp } from '@pixi/react';
import { useCallback, useMemo, useState } from 'react';
import { __IS_DEV__ } from '../../../constants';
import { GameOverScreen } from '../GameOverScreen';
import { InGameUI } from '../InGameUI';
import { SignalList, useCatchSignal } from '../../../utils/signaller/emitSignal';
export const UI_SPRITESHEET = './sprites/menuAtlas.json';
export const MENU_BUTTON_NAME = 'menu button.png';

export enum Pages {
  Main = 'main',
  GameOver = 'gameover',
}

const getPage = (page: Pages) => {
  switch (page) {
    case Pages.GameOver:
      return <GameOverScreen spritesheetUrl={UI_SPRITESHEET} menuButtonName={MENU_BUTTON_NAME} />;
    case Pages.Main:
      return <InGameUI />;
  }
};

type Props = {
  x?: number;
  y?: number;
};

export const UI = ({ x = 0, y = 0 }: Props) => {
  const app = useApp();
  const [page, setPage] = useState<Pages>(Pages.Main);
  const width = useMemo(() => {
    return app.screen.width;
  }, [app.screen.width]);

  const onGameOver = useCallback(() => setPage(Pages.GameOver), []);
  useCatchSignal(SignalList.GameOver, onGameOver);

  const onReset = useCallback(() => setPage(Pages.Main), []);
  useCatchSignal(SignalList.Reset, onReset);

  return (
    <Container x={x} y={y} width={width} zIndex={10}>
      {getPage(page)}
    </Container>
  );
};
