import { memo, useCallback } from 'react';
import {
  MIDDLE_PART_NAME,
  DIRT_MIDDLE_PART_NAME,
} from '../../../TileGround/components/Grass/contants';
import { Grass } from '../../../TileGround/components/Grass/Grass';
import { ChunkProps } from '../../typings';
import { Container } from '@pixi/react';
import { DamagingStaticBody } from '../../../DamagingStaticBody';
import { Sprite } from '../../../Sprite';
import { Filters } from '../../../../constants';

const FILTERS = [Filters.WHITE_OUTLINE_FILTER, Filters.RED_OUTLINE_FILTER];

export const SPIKES_ROW_WIDTH = 4;
const TRASH_URL = 'trash.png';

export const SpikesRow = memo(
  ({
    spritesheetUrl,
    x,
    y,
    tileSize,
    tilesHeight,
    width = SPIKES_ROW_WIDTH,
    zIndex,
  }: ChunkProps) => {
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

        <Sprite
          x={x + ((width - 1) * tileSize) / 2}
          y={y - (tilesHeight - 0.45) * tileSize}
          width={width * tileSize * 0.4}
          height={tileSize * 0.5}
          textureUrl={TRASH_URL}
          spritesheet={spritesheetUrl}
          filters={FILTERS}
        />

        <DamagingStaticBody
          x={x + ((width + 0.7) * tileSize) / 2}
          y={y - ((tilesHeight + 0.5) * tileSize) / 2}
          width={width * tileSize * 0.35}
          height={tileSize * 0.4}
        />
      </Container>
    );
  },
);
