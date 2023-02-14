export enum PercentTypes {
  Down = 'down',
  Stay = 'stay',
  Up = 'up',
}

export type LandscapeOffsetsType = number[];

export type PercentMapType = Record<number, PercentTypes>;

export type LandscapeBlockSize = { width: number; yOffset: number };

export type LandscapeParamsType = {
  x: number;
  y: number;
  width: number;
};

export type ChunkProps = {
  width: number;
  changeLevelEvery?: number;
  tileSize: number;
  tilesHeight: number;
  spritesheetUrl: string;
  x: number;
  y: number;
};
