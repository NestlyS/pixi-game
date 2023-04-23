import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { Container } from '@pixi/react';
import { useDispatch, useSelector } from 'react-redux';
import { Assets } from 'pixi.js';

import { useGlobalCheck } from '../../utils/useControlKey';
import { ControllableBody } from '../../components/Controllable';
import { GlobalViewport } from '../../components/GlobalViewport';
import { GODRAY_FILTER } from '../../constants';
import { Grass } from '../../components/TileGround/components/Grass/Grass';
import { LevelManager } from '../../components/LevelManager';
import { UI } from '../../components/ui/UI';
import { Background } from '../../components/Background';
import { SignalList, useCatchSignal } from '../../utils/signaller/emitSignal';
import {
  selectAppControllerHeight,
  selectAppControllerWidth,
} from '../../redux/appController/selectors';
import { initSoundBundle, playSound, stopSound } from '../../utils/soundPlayer';
import {
  increaseSpeedMult,
  resetDistanceCounter,
  resetSpeedMult,
  setPage,
  stopGame,
} from '../../redux/gamePage';
import { DistanceCounter } from '../../components/DistanceCounter';
import {
  selectPageGameInitedState,
  selectPageGamePauseState,
} from '../../redux/gamePage/selectors';
import { Pages } from '../../redux/gamePage/typings';

export const spritesheetUrl = './sprites/atlas.json';
const SPEED_UP_INTERVAL = 10000;
const SPEED_UP_AMOUNT = 0.05;

const SCREEN_BUNDLE = 'game-screen';

export const Game = () => {
  const [isLoaded, setLoaded] = useState(false);
  const width = useSelector(selectAppControllerWidth);
  const height = useSelector(selectAppControllerHeight);
  const isInited = useSelector(selectPageGameInitedState);
  const isPaused = useSelector(selectPageGamePauseState);
  const dispatch = useDispatch();
  useGlobalCheck();

  useEffect(() => {
    const cb = async () => {
      await Assets.loadBundle(SCREEN_BUNDLE);
      initSoundBundle(SCREEN_BUNDLE);
      setLoaded(true);
    };

    cb();
  }, []);

  useEffect(() => {
    const id = setInterval(() => dispatch(increaseSpeedMult(SPEED_UP_AMOUNT)), SPEED_UP_INTERVAL);
    return () => clearInterval(id);
  }, [dispatch]);

  useEffect(() => {
    if (!isLoaded) return;

    if (isInited) {
      playSound('game', {
        loop: true,
      });
    }

    if (!isInited || isPaused) {
      stopSound('game');
    }
  }, [isInited, isLoaded, isPaused]);

  const cb = useCallback(() => {
    dispatch(stopGame());
    dispatch(resetSpeedMult());
    dispatch(resetDistanceCounter());
    dispatch(setPage(Pages.CharacterSelect));
    flushSync(() => setLoaded(false));
    setTimeout(() => flushSync(() => setLoaded(true)));
  }, [dispatch]);

  useCatchSignal(SignalList.Reset, cb);

  if (!isLoaded) return null;

  return (
    <>
      <Container filters={[GODRAY_FILTER]}>
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
          <Grass
            x={280}
            y={500}
            tilesWidth={18}
            tilesHeight={2}
            tileSize={80}
            spritesheetUrl={spritesheetUrl}
          />
          {isInited && (
            <LevelManager
              x={1000}
              y={500}
              tileSize={80}
              chunkWidth={20}
              tilesHeight={2}
              spritesheetUrl={spritesheetUrl}
            />
          )}
          <ControllableBody x={200} y={300} />
        </GlobalViewport>
      </Container>
      <UI />
    </>
  );
};
