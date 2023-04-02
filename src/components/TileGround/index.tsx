import React, { memo, useCallback, useMemo } from 'react';
import { Ground } from '../Ground';
import { Row } from './Row';

export type Props = {
  x: number;
  y: number;
  tileSize: number;
  tilesWidth: number;
  tilesHeight: number;
  spritesheetUrl: string;
  getTexture: (indexX: number, indexY: number, length: number, height: number) => string;
};

export const TileGround = memo(
  ({ x, y, tileSize, tilesWidth, tilesHeight, spritesheetUrl, getTexture }: Props) => {
    const arr = new Array(Math.floor(tilesHeight)).fill(0);

    const bodyWidth = tilesWidth * tileSize;
    const bodyHeight = tilesHeight * tileSize;

    const sprites = useMemo(
      () =>
        arr.map((_, index) => {
          /*
      К сожалению, расположение y координаты спрайта относительно объекта коллизии можно получить только таким вот способом.
        Из "y" мы сначала вычитаем половину общей высоты объекта коллизии,
          а потом уже регулируем расположение строчки спрайтов при помощи индекса, умноженного на размер спрайта.
        Также добавляем половину размера спрайта, так как смещение относительно центра неверно указывает расположение центра спрайта.

      То же самое относится и к innerX.
    */
          const getInnerY = (index: number) => y - bodyHeight / 2 + index * tileSize + tileSize / 2;
          const cb = (indexX: number) => getTexture(indexX, index, tilesWidth, tilesHeight);
          const innerX = x - bodyWidth / 2 + tileSize / 2;

          if (index === 0) {
            return (
              <Row
                key={index}
                tilesCount={tilesWidth}
                startX={innerX}
                startY={getInnerY(index)}
                tileSize={tileSize}
                spritesheet={spritesheetUrl}
                getTexture={cb}
              />
            );
          }

          return (
            <Row
              key={index}
              tilesCount={tilesWidth}
              startX={innerX}
              startY={getInnerY(index)}
              tileSize={tileSize}
              spritesheet={spritesheetUrl}
              getTexture={cb}
            />
          );
        }),
      [
        arr,
        bodyHeight,
        bodyWidth,
        getTexture,
        spritesheetUrl,
        tileSize,
        tilesHeight,
        tilesWidth,
        x,
        y,
      ],
    );

    return (
      <Ground x={x} y={y} width={bodyWidth} height={bodyHeight}>
        {sprites}
      </Ground>
    );
  },
);
