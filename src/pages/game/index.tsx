import { flushSync } from 'react-dom';
import { Container } from '@pixi/react';

import { useCallback, useLayoutEffect, useState } from 'react';
import { useGlobalCheck } from '../../utils/useControlKey';
import { ControllableBody } from '../../components/Controllable';
import { GlobalViewport } from '../../components/GlobalViewport';
import { GODRAY_FILTER } from '../../constants';
import { Grass } from '../../components/TileGround/components/Grass/Grass';
import { LevelManager } from '../../components/LevelManager';
import { TrashStorage } from '../../components/TrashStorage';
import { WORLD_HEIGHT } from '../../App';
import { Assets } from 'pixi.js';
import { Background } from '../../components/Background';
import { SignalList, useCatchSignal } from '../../utils/signaller/emitSignal';
import { UI } from '../../components/ui/UI';

export const spritesheetUrl = './sprites/atlas.json';

export const Game = () => {
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
    <TrashStorage>
      <Container filters={[GODRAY_FILTER]}>
        <GlobalViewport width={WORLD_HEIGHT} height={WORLD_HEIGHT} outsideViewport={<Background />}>
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
          <ControllableBody x={500} y={300} />
        </GlobalViewport>
      </Container>
      <UI />
    </TrashStorage>
  );
};
