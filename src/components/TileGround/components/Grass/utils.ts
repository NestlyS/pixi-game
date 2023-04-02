import {
  LEFT_EDGE_NAME,
  MIDDLE_PART_NAME,
  RIGHT_EDGE_NAME,
  DIRT_LEFT_EDGE_NAME,
  DIRT_MIDDLE_PART_NAME,
  DIRT_RIGHT_EDGE_NAME,
} from './contants';

type TextureType<T = string> = (
  indexX: number,
  indexY: number,
  length: number,
  height: number,
  isSingle?: boolean,
) => T;

export const getMainTexture =
  (textureModifier?: TextureType<string | null>): TextureType =>
  (indexX, indexY, length, height, isSingle) => {
    const modifiedTexture = textureModifier?.(indexX, indexY, length, height);

    if (modifiedTexture) return modifiedTexture;

    if (!isSingle && indexY === 0) return MIDDLE_PART_NAME;
    if (!isSingle && indexY !== 0) return DIRT_MIDDLE_PART_NAME;

    if (indexY === 0) {
      if (indexX === 0) {
        return LEFT_EDGE_NAME;
      }

      if (indexX < length - 1) {
        return MIDDLE_PART_NAME;
      }

      return RIGHT_EDGE_NAME;
    }

    if (indexX === 0) {
      return DIRT_LEFT_EDGE_NAME;
    }

    if (indexX < length - 1) {
      return DIRT_MIDDLE_PART_NAME;
    }

    return DIRT_RIGHT_EDGE_NAME;
  };
