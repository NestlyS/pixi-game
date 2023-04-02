import { flushSync } from 'react-dom';
import { Container, Text, useApp } from '@pixi/react';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useGlobalCheck } from '../../utils/useControlKey';
import { ControllableBody } from '../Controllable';
import { GlobalViewport } from '../GlobalViewport';
import { GODRAY_FILTER, PIXEL_FONT } from '../../constants';
import { Grass } from '../TileGround/components/Grass/Grass';
import { LevelManager } from '../LevelManager';
import { HealthStorage } from '../HealthStorage';
import { TrashStorage } from '../TrashStorage';
import { MainUserStorage } from '../MainUserStorage';
import { WORLD_HEIGHT } from '../../App';
import { Assets } from 'pixi.js';
import { Background } from '../Background';
import { SignalList, useCatchSignal } from '../../utils/signaller/emitSignal';
import { UI } from '../ui/UI';
import { Healer } from '../Healer';

export const spritesheetUrl = './sprites/atlas.json';

export const Canvas = () => {
  const [isLoaded, setLoaded] = useState(false);
  useGlobalCheck();

  useLayoutEffect(() => {
    Assets.loadBundle('game-screen').then(() => setLoaded(true));
  }, []);

  const cb = useCallback(() => {
    flushSync(() => setLoaded(false));
    setTimeout(() => flushSync(() => setLoaded(true)));
  }, []);
  useCatchSignal(SignalList.Reset, cb);

  if (!isLoaded) return null;

  return (
    <MainUserStorage>
      <HealthStorage>
        <TrashStorage>
          <Container filters={[GODRAY_FILTER]}>
            <Background />
            <GlobalViewport width={WORLD_HEIGHT} height={WORLD_HEIGHT}>
              <Grass
                x={440}
                y={500}
                tilesWidth={14}
                tilesHeight={2}
                tileSize={80}
                spritesheetUrl={spritesheetUrl}
              />
              <LevelManager
                x={1000}
                y={500}
                tileSize={80}
                chunkWidth={20}
                tilesHeight={2}
                spritesheetUrl={spritesheetUrl}
              />
              <ControllableBody />
            </GlobalViewport>
          </Container>
          <UI />
        </TrashStorage>
      </HealthStorage>
    </MainUserStorage>
  );
};
