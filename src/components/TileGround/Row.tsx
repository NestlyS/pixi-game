import { memo } from 'react';
import { SpriteController } from '../controllers/SpriteController';

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
      <>
        {new Array(Math.floor(tilesCount)).fill(0).map((_, index, array) => {
          if (index === 0) {
            return (
              <SpriteController
                pixelised
                key={index}
                x={startX}
                y={startY}
                width={tileSize}
                height={tileSize}
                spritesheet={spritesheet}
                textureUrl={getTexture(index)}
              />
            );
          }

          if (index === array.length - 1) {
            return (
              <SpriteController
                pixelised
                key={index}
                x={startX + tileSize * index}
                y={startY}
                width={tileSize}
                height={tileSize}
                spritesheet={spritesheet}
                textureUrl={getTexture(index)}
              />
            );
          }

          return (
            <SpriteController
              pixelised
              key={index}
              x={startX + tileSize * index}
              y={startY}
              width={tileSize}
              height={tileSize}
              spritesheet={spritesheet}
              textureUrl={getTexture(index)}
            />
          );
        })}
      </>
    );
  },
);
