export const LEFT_EDGE_NAME = 'ground-start.png';
export const MIDDLE_PART_NAME = 'ground-middle.png';
export const RIGHT_EDGE_NAME = 'ground-end.png';
export const DIRT_LEFT_EDGE_NAME = 'dirt-corner-left.png';
export const DIRT_MIDDLE_PART_NAME = 'dirt-middle.png';
export const DIRT_RIGHT_EDGE_NAME = 'dirt-corner-right.png';
export const DIRT_TO_GRASS_NAME = '113.png';
export const GRASS_TO_DIRT_NAME = '107.png';
export const GRASS_SMOOTH_UP_TRANSITION = 'grass-diag-up.png';
export const GRASS_UNDER_SMOOTH_UP_TRANSITION = 'ground-to-up.png';
export const GRASS_SMOOTH_DOWN_TRANSITION = 'grass-diag-down.png';
export const GRASS_UNDER_SMOOTH_DOWN_TRANSITION = 'ground-to-down.png';
export const CRACK_BOTTOM_LEFT = 'dirt1.png';
export const CRACK_BOTTOM_MIDDLE = 'dirt2.png';
export const CRACK_BOTTOM_RIGHT = 'dirt3.png';

export enum Decorations {
  Decoration1 = 'deco1',
  Decoration2 = 'deco2',
  Decoration3 = 'grass',
  Bush = 'bush',
  Plant = 'plant',
}

export const DECORATION_MAP = {
  1: Decorations.Decoration1,
  2: Decorations.Decoration2,
  3: Decorations.Decoration3,
};

export const DECORATION_MAP_TWO_TILES = {
  5: Decorations.Bush,
  6: Decorations.Plant,
  ...DECORATION_MAP,
};
