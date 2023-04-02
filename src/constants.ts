import { TextStyle } from 'pixi.js';
import { GodrayFilter } from 'pixi-filters';

export const EPS = 0.03;
export const ONE_CIRCLE_IN_RAD = 6.28;
export const ONE_CIRCLE_IN_DEGREES = 360;
export const __IS_DEV__ = process.env.NODE_ENV === 'development';

export const BOTTLE_TEXTURE = 'bottle_(1).png';
export const CHIPS_TEXTURE = 'chips_(1).png';
export const PAPER_TEXTURE = 'paper_(1).png';

export const PIXEL_FONT = new TextStyle({
  fontFamily: 'Press Start 2P',
  align: 'center',
  fill: ['#ffe5b4'],
  stroke: '#d98f45',
  strokeThickness: 5,
  letterSpacing: 5,
});

export const PIXEL_FONT_GREEN = new TextStyle({
  fontFamily: 'Press Start 2P',
  align: 'center',
  fill: ['#a8e08d'],
  stroke: '#23361d',
  strokeThickness: 5,
  letterSpacing: 5,
});

export const PIXEL_FONT_YELLOW = new TextStyle({
  fontFamily: 'Press Start 2P',
  align: 'center',
  fill: ['#ffe5b4'],
  stroke: '#4a380c',
  strokeThickness: 5,
  letterSpacing: 5,
});

export const PIXEL_FONT_WHITE = new TextStyle({
  fontFamily: 'Press Start 2P',
  align: 'center',
  fill: ['#d1d4be'],
  stroke: '#3b322e',
  strokeThickness: 5,
  letterSpacing: 5,
});

export const PIXEL_FONT_RED = new TextStyle({
  fontFamily: 'Press Start 2P',
  align: 'center',
  fill: ['#e0266a'],
  stroke: '#731d2c',
  strokeThickness: 5,
  letterSpacing: 5,
  fontSize: 40,
});

export const GODRAY_FILTER = new GodrayFilter({ alpha: 0.4, lacunarity: 4 });

export const MONSTER_LABEL = 'monster';
export const AI_SENSOR_LABEL = 'ai-sensor';
export const ATTACK_SENSOR_LABEL = 'attack_sensor';
export const USER_LABEL = 'user';
