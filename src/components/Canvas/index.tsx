import { Container, Text, useApp } from '@inlet/react-pixi';
import { useGlobalCheck } from '../../utils/useControlKey';
import { ControllableBody } from '../Controllable';
import { GlobalViewport } from '../GlobalViewport';
import { PIXEL_FONT } from '../../constants';
import { Grass } from '../TileGround/components/Grass/Grass';
import { LevelManager } from '../LevelManager';
import { HealthStorage } from '../HealthStorage';
import { HeartBar } from '../ui/HeartBar';
import { Box } from '../Box';
import { Background } from '../Background';
import { Monster } from '../Monster';
import { useCallback, useEffect, useState } from 'react';
import { TrashCounter } from '../ui/TrashCounter';
import { Bottle } from '../trashes/Bottle';
import { Chips } from '../trashes/Chips';
import { Paper } from '../trashes/Paper';
import { TrashStorage } from '../TrashStorage';
import { MainUserStorage } from '../MainUserStorage';
import { WORLD_HEIGHT } from '../../App';
import { Button } from '../ui/Button';
import { Menu } from '../ui/Menu';
import { Sprite } from '../Sprite';

export const spritesheetUrl = './sprites/atlas.json';

export const Canvas = () => {
  useGlobalCheck();

  return (
    <MainUserStorage>
      <HealthStorage>
        <TrashStorage>
          <Background />
          {/* @ts-ignore */}
          <Container sortableChildren={true}>
            <Menu />
            <GlobalViewport width={WORLD_HEIGHT} height={WORLD_HEIGHT}>
              <Grass
                x={400}
                y={410}
                tilesWidth={5}
                tilesHeight={3}
                tileSize={60}
                spritesheetUrl={spritesheetUrl}
              />
              <Grass
                x={700}
                y={410}
                tilesWidth={5}
                tilesHeight={3}
                tileSize={60}
                spritesheetUrl={spritesheetUrl}
              />
              <Grass
                x={800}
                y={210}
                tilesWidth={4}
                tilesHeight={1}
                tileSize={60}
                spritesheetUrl={spritesheetUrl}
              />
              <LevelManager
                x={1000}
                y={500}
                tileSize={60}
                chunkWidth={10}
                tilesHeight={5}
                spritesheetUrl={spritesheetUrl}
              />
              <Bottle x={1100} y={200} />
              <Chips x={1150} y={200} />
              <Paper x={1200} y={200} />
              <Bottle x={1100} y={150} />
              <Chips x={1150} y={150} />
              <Paper x={1200} y={150} />
              <Monster x={1300} y={150} />
              <ControllableBody />
            </GlobalViewport>
          </Container>
        </TrashStorage>
      </HealthStorage>
    </MainUserStorage>
  );
};
