import { useCallback, useState } from 'react';
import { Container } from '@pixi/react';
import { useDispatch, useSelector } from 'react-redux';
import { Assets } from 'pixi.js';

import { useGlobalCheck } from '../../utils/useControlKey';
import { GlobalViewport } from '../../components/GlobalViewport';
import { Filters, GAME_SPRITESHEET_URL, TILE_SIZE } from '../../constants';
import { LevelManager } from '../../components/LevelManager';
import { UI } from './components/UI';
import { Background } from '../../components/Background';
import { SignalList, useCatchSignal } from '../../utils/signaller/emitSignal';
import {
  selectAppControllerHeight,
  selectAppControllerWidth,
} from '../../redux/appController/selectors';
import { initSoundBundle } from '../../utils/soundController';
import { resetDistanceCounter, resetSpeedMult, setGamePage, stopGame } from '../../redux/gamePage';
import { DistanceCounter } from '../../components/DistanceCounter';
import { selectPageGameInitedState } from '../../redux/gamePage/selectors';
import { Pages } from '../../redux/gamePage/typings';
import { resetTrash, setAttackCooldown, setSpeciaCooldown } from '../../redux/mainUser';
import { useLowGraphic } from '../../utils/useLowGraphic';
import { useInitPageData } from '../../utils/initPageData';
import { StartPlatfrom } from './components/StartPlatform';

const SCREEN_BUNDLE = 'game-screen';

export const Game = () => {
  const [resetCounter, setReset] = useState(0);
  const width = useSelector(selectAppControllerWidth);
  const height = useSelector(selectAppControllerHeight);
  const isInited = useSelector(selectPageGameInitedState);
  const dispatch = useDispatch();
  const filters = useLowGraphic(Filters.GODRAY_FILTER);

  const init = useCallback(async () => {
    await Assets.loadBundle(SCREEN_BUNDLE);
    initSoundBundle(SCREEN_BUNDLE);
  }, []);

  const cb = useCallback(() => {
    dispatch(stopGame());
    dispatch(resetSpeedMult());
    dispatch(resetDistanceCounter());
    dispatch(resetTrash());
    dispatch(setSpeciaCooldown(0));
    dispatch(setAttackCooldown(0));
    dispatch(setGamePage(Pages.CharacterSelect));
    setReset((val) => val + 1);
  }, [dispatch]);

  useGlobalCheck();
  useCatchSignal(SignalList.Reset, cb);
  const isLoaded = useInitPageData(init);

  if (!isLoaded) return null;

  return (
    <Container key={resetCounter}>
      <Container filters={filters}>
        <GlobalViewport
          width={width}
          height={height}
          outsideViewport={
            <>
              <Background />
              <DistanceCounter />
            </>
          }
        >
          {isInited && (
            <LevelManager
              x={1000}
              y={500}
              tileSize={TILE_SIZE}
              chunkWidth={20}
              tilesHeight={2}
              spritesheetUrl={GAME_SPRITESHEET_URL}
            />
          )}
          <StartPlatfrom rightEdgeX={1000} y={500} />
        </GlobalViewport>
      </Container>
      <UI />
    </Container>
  );
};
