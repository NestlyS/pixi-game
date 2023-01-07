
export const LEFT_EDGE_NAME = 'grass-up-start.png';
export const MIDDLE_PART_NAME = 'grass-up-middle.png';
export const RIGHT_EDGE_NAME = 'grass-up-end.png';
export const DIRT_LEFT_EDGE_NAME = 'dirt-start.png';
export const DIRT_MIDDLE_PART_NAME = 'dirt-middle-1.png';
export const DIRT_RIGHT_EDGE_NAME = 'dirt-end.png';
export const DIRT_TO_GRASS_NAME = 'grass-bottom-dirt-to-grass.png';
export const GRASS_TO_DIRT_NAME = 'grass-bottom-grass-to-dirt.png';
export const GRASS_DECORATION_1 = 'grass-deco-1.png';
export const GRASS_DECORATION_2 = 'grass-deco-2.png';
export const GRASS_DECORATION_3 = 'grass-deco-3.png';
export const GRASS_DECORATION_4 = 'grass-deco-4.png';
export const GRASS_DECORATION_BUSH_START = 'grass-bush-1.png';
export const GRASS_DECORATION_BUSH_END = 'grass-bush-2.png';
export const GRASS_DECORATION_PLANT_UP_START = 'grass-plant-1.png';
export const GRASS_DECORATION_PLANT_UP_END = 'grass-plant-2.png';
export const GRASS_DECORATION_PLANT_DOWN_START = 'grass-plant-3.png';
export const GRASS_DECORATION_PLANT_DOWN_END = 'grass-plant-4.png';

export enum Decorations {
  Decoration1 = 'deco1',
  Decoration2 = 'deco2',
  Decoration3 = 'deco3',
  Decoration4 = 'deco4',
  Bush = 'bush',
  Plant = 'plant'
}

export const DECORATION_MAP = {
  1: Decorations.Decoration1,
  2: Decorations.Decoration2,
}

export const DECORATION_MAP_TWO_TILES = {
  3: Decorations.Decoration3,
  4: Decorations.Decoration4,
  5: Decorations.Bush,
  6: Decorations.Plant,
  ...DECORATION_MAP
}