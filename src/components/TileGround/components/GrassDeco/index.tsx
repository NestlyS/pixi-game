import { memo, useMemo } from 'react';
import { getRandomValue } from '../../../../utils/getRandomValue';
import { Sprite } from '../../../Sprite';
import {
  GRASS_DECORATION_1,
  GRASS_DECORATION_2,
  GRASS_DECORATION_3,
  GRASS_DECORATION_4,
  GRASS_DECORATION_5,
  GRASS_DECORATION_6,
  GRASS_DECORATION_7,
  GRASS_DECORATION_BUSH,
  GRASS_DECORATION_BUSH_BERRY,
  GRASS_DECORATION_BUSH_SMALL,
  GRASS_DECORATION_TREE,
  GRASS_DECORATION_TREE_2,
  GRASS_FLOOR,
  GRASS_FLOOR_2,
} from './constants';

type Layer = {
  startIndex: number;
  endIndex: number;
  cooldown: number;
  sprites: string[];
  percentages: number[];
};

const MAX_PERCENT = 100;

const Layers: Layer[] = [
  {
    startIndex: 2,
    endIndex: 0,
    cooldown: 2,
    sprites: [GRASS_DECORATION_TREE, GRASS_DECORATION_TREE_2],
    percentages: [50, 30, 20, 5],
  },
  {
    startIndex: 0,
    endIndex: 0,
    cooldown: 1,
    sprites: [GRASS_DECORATION_BUSH_BERRY, GRASS_DECORATION_BUSH_SMALL, GRASS_DECORATION_BUSH],
    percentages: [70, 60, 50, 15, 5],
  },
  {
    startIndex: 0,
    endIndex: 0,
    cooldown: 0,
    sprites: [
      GRASS_DECORATION_7,
      GRASS_DECORATION_6,
      GRASS_DECORATION_5,
      GRASS_DECORATION_4,
      GRASS_DECORATION_3,
      GRASS_DECORATION_2,
      GRASS_DECORATION_1,
    ],
    percentages: [95, 90, 90, 90, 80, 70, 60, 50, 35, 10, 5, 2],
  },
];

type SpriteParams = {
  x: number;
  y: number;
  textureUrl: string;
  key: string;
};

type ReducerAccType = {
  percentages: Layer['percentages'];
  sprites: SpriteParams[];
  lastAdditionAgo: number;
};

const getLayer = (layer: Layer, width: number, step: number, y: number) =>
  new Array(width / step).fill(0).reduce(
    (acc: ReducerAccType, _, index, arr) => {
      if (layer.startIndex > index || index > arr.length - 1 - layer.endIndex) return acc;

      if (acc.lastAdditionAgo >= 0) {
        acc.lastAdditionAgo -= 1;
        return acc;
      }

      const percentages = [...acc.percentages];
      const currentPercentage = percentages.shift();

      if (!currentPercentage) return acc;

      const rand = getRandomValue(0, MAX_PERCENT);

      if (rand > currentPercentage) return acc;

      const length = getRandomValue(0, layer.sprites.length - 1);

      const textureUrl = layer.sprites[length];
      const key = `${textureUrl}-${acc.percentages.length}`;
      const value = {
        x: index * step,
        y,
        textureUrl,
        key,
      } as SpriteParams;

      return {
        percentages,
        sprites: [...acc.sprites, value],
        lastAdditionAgo: layer.cooldown,
      } as ReducerAccType;
    },
    { percentages: layer.percentages, sprites: [], lastAdditionAgo: 0 } as ReducerAccType,
  ).sprites;

const getTexuresInLayers = (width: number, y: number, step = 5): SpriteParams[][] =>
  Layers.map((item) => getLayer(item, width, step, y));

const getGrassFloorLevel = (width: number, y: number, step = 3): SpriteParams[] =>
  new Array(width / step).fill(0).map((_, index) => {
    const rand = getRandomValue(0, MAX_PERCENT);

    return {
      x: index * step,
      y,
      textureUrl: rand > MAX_PERCENT / 2 ? GRASS_FLOOR : GRASS_FLOOR_2,
      key: `${index}`,
    };
  });

type Props = {
  x: number;
  y: number;
  width: number;
  spritesheetUrl: string;
  step?: number;
};

const anchor = {
  x: 1,
  y: 1,
};

const scale = { x: 4, y: 4 };

/**
 * Декорация состоит из трех слоев:
 * 1. Слой деревьев на самом дальнем фоне
 * 2. Слой кустов и травы
 * 3. Слой низкой травы и цветов
 */
export const GrassDeco = memo(({ x, y, width, step, spritesheetUrl }: Props) => {
  const textures = useMemo(
    () => [...getTexuresInLayers(width, y, step), getGrassFloorLevel(width, y, step)],
    [step, width, y],
  );

  return (
    <>
      {textures.map((texArr) =>
        texArr.map((tex) => (
          <Sprite
            x={x + tex.x}
            y={tex.y}
            textureUrl={tex.textureUrl}
            spritesheet={spritesheetUrl}
            key={tex.key}
            anchor={anchor}
            scale={scale}
            zIndex={1}
          />
        )),
      )}
    </>
  );
});
