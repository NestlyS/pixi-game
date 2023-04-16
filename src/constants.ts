import { TextStyle } from 'pixi.js';
import { ColorOverlayFilter, DropShadowFilter, GodrayFilter, OutlineFilter } from 'pixi-filters';

export const EPS = 0.03;
export const ONE_CIRCLE_IN_RAD = 6.28;
export const ONE_CIRCLE_IN_DEGREES = 360;
export const MOBILE_SIZE = 800;
export const __IS_DEV__ = process.env.NODE_ENV === 'development';

export const UI_OUTLINE_COLOR = 0xa92176;

export const MAIN_FONT_NAME = 'Press Start 2P';

export const BOTTLE_TEXTURE = 'bottle_(1).png';
export const CHIPS_TEXTURE = 'chips_(1).png';
export const PAPER_TEXTURE = 'paper_(1).png';

export const JUMP_KEY_CODE = 'KeyW';
export const JUMP_KEY_CODE_1 = 'Space';
export const JUMP_KEY_CODE_2 = 'ArrowUp';
export const SLIDE_KEY_CODE = 'KeyS';
export const SLIDE_KEY_CODE_EXTRA = 'ArrowDown';
export const RUN_LEFT_KEY_CODE = 'KeyA';
export const RUN_RIGTH_KEY_CODE = 'KeyD';
export const ATTACK_KEY_CODE = 'KeyE';
export const ATTACK_KEY_CODE_EXTRA = 'ControlLeft';
export const HEAL_KEY_CODE = 'KeyQ';
export const HEAL_KEY_CODE_EXTRA = 'AltLeft';

export const SKIP_KEY_CODE = 'Space';

export const PIXEL_FONT = new TextStyle({
  fontFamily: MAIN_FONT_NAME,
  align: 'center',
  fill: ['#ffe5b4'],
  stroke: '#d98f45',
  strokeThickness: 5,
  letterSpacing: 5,
});

export const BIG_NOVEL_FONT = new TextStyle({
  fontFamily: MAIN_FONT_NAME,
  align: 'center',
  fill: [UI_OUTLINE_COLOR],
  stroke: '#ffffff',
  strokeThickness: 10,
  letterSpacing: 5,
  fontSize: 40,
});

export const NORMAL_NOVEL_FONT = new TextStyle({
  fontFamily: MAIN_FONT_NAME,
  align: 'center',
  fill: [UI_OUTLINE_COLOR],
  stroke: '#ffffff',
  strokeThickness: 6,
  letterSpacing: 5,
  fontSize: 20,
});

export const PIXEL_FONT_GREEN = new TextStyle({
  fontFamily: MAIN_FONT_NAME,
  align: 'center',
  fill: ['#a8e08d'],
  stroke: '#23361d',
  strokeThickness: 5,
  letterSpacing: 5,
});

export const PIXEL_FONT_YELLOW = new TextStyle({
  fontFamily: MAIN_FONT_NAME,
  align: 'center',
  fill: ['#ffe5b4'],
  stroke: '#4a380c',
  strokeThickness: 5,
  letterSpacing: 5,
});

export const PIXEL_FONT_WHITE = new TextStyle({
  fontFamily: MAIN_FONT_NAME,
  align: 'center',
  fill: ['#d1d4be'],
  stroke: '#3b322e',
  strokeThickness: 5,
  letterSpacing: 5,
});

export const PIXEL_FONT_RED = new TextStyle({
  fontFamily: MAIN_FONT_NAME,
  align: 'center',
  fill: ['#e0266a'],
  stroke: '#731d2c',
  strokeThickness: 5,
  letterSpacing: 5,
  fontSize: 40,
});

export const GODRAY_FILTER = new GodrayFilter({ alpha: 0.4, lacunarity: 4 });
export const BLACK_OUTLINE_FILTER = new OutlineFilter(4, 0x251059, 0.05);
export const WHITE_OUTLINE_FILTER = new OutlineFilter(3, 0xffffff, 0.05);
export const PURPLE_OUTLINE_FILTER = new OutlineFilter(3, UI_OUTLINE_COLOR, 0.05);
export const UI_OUTLINE_FILTER = new OutlineFilter(5, UI_OUTLINE_COLOR, 0.05);
export const SHADOW_FILTER = new DropShadowFilter();
export const COLOR_OVERLAY_FILTER_STEP_0 = new ColorOverlayFilter([0.5, 0.1, 0.1], 0.8);
export const COLOR_OVERLAY_FILTER_STEP_1 = new ColorOverlayFilter([0.5, 0.3, 0.3], 0.6);
export const COLOR_OVERLAY_FILTER_STEP_2 = new ColorOverlayFilter([0.5, 0.5, 0.5], 0.4);

export const MONSTER_LABEL = 'monster';
export const AI_SENSOR_LABEL = 'ai-sensor';
export const ATTACK_SENSOR_LABEL = 'attack_sensor';
export const USER_LABEL = 'user';

export enum Pages {
  game = 'game',
  novel = 'novel',
}
