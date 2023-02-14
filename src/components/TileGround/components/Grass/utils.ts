import { getRandomValue } from '../../../../utils/getRandomValue';
import {
  LEFT_EDGE_NAME,
  MIDDLE_PART_NAME,
  RIGHT_EDGE_NAME,
  DIRT_LEFT_EDGE_NAME,
  DIRT_MIDDLE_PART_NAME,
  DIRT_RIGHT_EDGE_NAME,
  Decorations,
  DECORATION_MAP,
} from './contants';

type TextureType<T = string> = (
  indexX: number,
  indexY: number,
  length: number,
  height: number,
) => T;

export const getMainTexture =
  (textureModifier?: TextureType<string | null>): TextureType =>
  (indexX: number, indexY: number, length: number, height: number) => {
    const modifiedTexture = textureModifier?.(indexX, indexY, length, height);

    if (modifiedTexture) return modifiedTexture;

    if (indexY === 0) {
      if (indexX === 0) {
        return LEFT_EDGE_NAME;
      }

      if (indexX < length) {
        return MIDDLE_PART_NAME;
      }

      return RIGHT_EDGE_NAME;
    }

    if (indexX === 0) {
      return DIRT_LEFT_EDGE_NAME;
    }

    if (indexX < length) {
      return DIRT_MIDDLE_PART_NAME;
    }

    return DIRT_RIGHT_EDGE_NAME;
  };

// export const generateTexture = () => {
//   let lastUncompletedSprite: null | Decorations = null;

//   return (decoType: Decorations) => {
//     switch (decoType) {
//       case Decorations.Decoration1: return GRASS_DECORATION_1;
//       case Decorations.Decoration2: return GRASS_DECORATION_2;
//       case Decorations.Decoration3: return GRASS_DECORATION_3;
//       case Decorations.Bush: {
//         return GRASS_DECORATION_BUSH;
//       }
//       case Decorations.Plant: {
//         lastUncompletedSprite = Decorations.Plant;
//         return GRASS_DECORATION_TREE;
//       }
//       default:
//         return GRASS_DECORATION_1;
//     }
//   }
// };

// const getOneTileTexture = (getTexture: (decoType: Decorations) => string) => {
//   const max = Object.keys(DECORATION_MAP).length - 1;
//   const min = 0;

//   const random = getRandomValue(min, max);
//   const value = Object.entries(DECORATION_MAP)[random];

//   return getTexture(value[1]);
// }

// export const generateDecorationGenerator = () => {
//   const getTexture = generateTexture();

//   return (lenght: number, height: number) => (indexX: number) => {
//     return getOneTileTexture(getTexture);
//   }
// };
