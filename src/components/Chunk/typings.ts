import { GrassProps } from "../TileGround/Grass";

export enum PercentTypes {
  Down = 'down',
  Stay = 'stay',
  Up = 'up',
}

export type LandscapeOffsetsType = number[];

export type PercentMapType = Record<number, PercentTypes>;

export type LandscapeBlockSize = { width: number, yOffset: number };

export type LandscapeParamsType = {
  x: number,
  y: number,
  width: number,
}

export type ModifiedGrassProps = Omit<GrassProps, 'tilesWidth'>;