import React, { memo } from 'react';
import { Grass } from '../../../TileGround/components/Grass/Grass';
import { ChunkProps } from '../../typings';
import { Gnida } from '../../../Gnida';
import { Container } from '@pixi/react';

export const GNIDA_ROW_WIDTH = 4;

export const GnidaChunk = memo(
  ({
    spritesheetUrl,
    x,
    y,
    tileSize,
    tilesHeight,
    width = GNIDA_ROW_WIDTH,
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
        <Gnida x={x} y={y} />
      </Container>
    );
  },
);
