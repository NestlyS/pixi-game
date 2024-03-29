import React, { memo } from 'react';
import { Grass } from '../../../TileGround/components/Grass/Grass';
import { ChunkProps } from '../../typings';
import { Healer } from '../../../Healer';
import { Container } from '@pixi/react';

export const HEALER_ROW_WIDTH = 4;

export const HealerChunk = memo(
  ({
    spritesheetUrl,
    x,
    y,
    tileSize,
    tilesHeight,
    width = HEALER_ROW_WIDTH,
    zIndex,
  }: ChunkProps) => {
    return (
      <Container zIndex={zIndex}>
        <Grass
          spritesheetUrl={spritesheetUrl}
          x={x + (width * tileSize) / 2}
          y={y}
          tileSize={tileSize}
          tilesWidth={width}
          tilesHeight={tilesHeight}
        />
        <Healer x={x} y={y} />
      </Container>
    );
  },
);
