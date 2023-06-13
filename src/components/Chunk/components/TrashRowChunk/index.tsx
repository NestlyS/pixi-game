import { memo, useCallback } from 'react';
import {
  MIDDLE_PART_NAME,
  DIRT_MIDDLE_PART_NAME,
} from '../../../TileGround/components/Grass/contants';
import { Grass } from '../../../TileGround/components/Grass/Grass';
import { TrashRow } from '../../../trashes/TrashRow';
import { ChunkProps } from '../../typings';
import { useTutorialContext } from '../../../../pages/game/components/TutorialStartPlatform/context';
import { Container } from '@pixi/react';

export const ROW_WIDTH = 8;

export const TrashRowChunk = memo(
  ({ spritesheetUrl, x, y, tileSize, tilesHeight, width = ROW_WIDTH, zIndex }: ChunkProps) => {
    const isTutorial = useTutorialContext();
    const textureModifier = useCallback((indexX: number, indexY: number, length: number) => {
      if (indexY === 0 && indexX <= length - 1) {
        return MIDDLE_PART_NAME;
      }

      return DIRT_MIDDLE_PART_NAME;
    }, []);

    return (
      <Container zIndex={zIndex}>
        <Grass
          textureModifier={textureModifier}
          spritesheetUrl={spritesheetUrl}
          x={x + (width * tileSize) / 2}
          y={y}
          tileSize={tileSize}
          tilesWidth={width}
          tilesHeight={tilesHeight}
        />
        <TrashRow
          x={x + tileSize}
          y={y - ((tilesHeight + 1) * tileSize) / 2}
          tileSize={tileSize}
          width={width - 2}
          type="random"
          isUncollectable={isTutorial}
        />
      </Container>
    );
  },
);
