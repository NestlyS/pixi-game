import { memo } from 'react';
import { Sprite } from '../Sprite';
import { Container } from '@pixi/react';

type RowProps = {
  tilesCount: number;
  startX: number;
  startY: number;
  tileSize: number;
  spritesheet: string;
  getTexture: (indexX: number) => string;
};

export const Row = memo(
  ({ tilesCount, startX, startY, tileSize, spritesheet, getTexture }: RowProps) => {
    return (
      <Container y={startY} x={startX}>
        {new Array(Math.floor(tilesCount)).fill(0).map((_, index) => {
          return (
            <Sprite
              pixelised
              key={index}
              x={tileSize * index}
              y={0}
              width={tileSize}
              height={tileSize}
              spritesheet={spritesheet}
              textureUrl={getTexture(index)}
            />
          );
        })}
      </Container>
    );
  },
);
