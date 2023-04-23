import { TextStyle } from 'pixi.js';
import { ColorOverlayFilter, DropShadowFilter, GodrayFilter, OutlineFilter } from 'pixi-filters';

export const EPS = 0.03;
export const ONE_CIRCLE_IN_RAD = 6.28;
export const ONE_CIRCLE_IN_DEGREES = 360;
export const MOBILE_SIZE = 800;

export const DEFAULT_WORLD_WIDTH = 1600;
export const DEFAULT_WORLD_HEIGHT = 900;

export const __IS_DEV__ = process.env.NODE_ENV === 'development';

export enum COLORS {
  UIOutline = 0xa92176,
  MainFontFill = 0xffe5b4,
  MainFontOutline = 0xd98f45,
  BottleFontFill = 0xa8e08d,
  BottleFontOutline = 0x23361d,
  ChipsFontFill = 0xffe5b4,
  ChipsFontOutline = 0x4a380c,
  PaperFontFill = 0xd1d4be,
  PaperFontOutline = 0x3b322e,
  NegativeFontFill = 0xe0266a,
  NegativeFontOutline = 0x731d2c,
  White = 0xffffff,
  Black = 0x251059,
}

export const MAIN_FONT_NAME = 'Press Start 2P';
export const COMMON_STROKE_THICKNESS = 6;

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
  fill: [COLORS.MainFontFill],
  stroke: COLORS.MainFontOutline,
  strokeThickness: COMMON_STROKE_THICKNESS,
  letterSpacing: 5,
});

export const BIG_NOVEL_FONT = new TextStyle({
  fontFamily: MAIN_FONT_NAME,
  align: 'center',
  fill: [COLORS.UIOutline],
  stroke: COLORS.White,
  strokeThickness: 10,
  letterSpacing: COMMON_STROKE_THICKNESS,
  fontSize: 40,
});

export const NORMAL_NOVEL_FONT = new TextStyle({
  fontFamily: MAIN_FONT_NAME,
  align: 'center',
  fill: [COLORS.UIOutline],
  stroke: COLORS.White,
  strokeThickness: COMMON_STROKE_THICKNESS,
  letterSpacing: 5,
  fontSize: 20,
});

export const PIXEL_FONT_GREEN = new TextStyle({
  fontFamily: MAIN_FONT_NAME,
  align: 'center',
  fill: [COLORS.BottleFontFill],
  stroke: COLORS.BottleFontOutline,
  strokeThickness: COMMON_STROKE_THICKNESS,
  letterSpacing: 5,
});

export const PIXEL_FONT_YELLOW = new TextStyle({
  fontFamily: MAIN_FONT_NAME,
  align: 'center',
  fill: [COLORS.ChipsFontFill],
  stroke: COLORS.ChipsFontOutline,
  strokeThickness: COMMON_STROKE_THICKNESS,
  letterSpacing: 5,
});

export const PIXEL_FONT_WHITE = new TextStyle({
  fontFamily: MAIN_FONT_NAME,
  align: 'center',
  fill: [COLORS.PaperFontFill],
  stroke: COLORS.PaperFontOutline,
  strokeThickness: COMMON_STROKE_THICKNESS,
  letterSpacing: 5,
});

export const PIXEL_FONT_RED = new TextStyle({
  fontFamily: MAIN_FONT_NAME,
  align: 'center',
  fill: [COLORS.NegativeFontFill],
  stroke: COLORS.NegativeFontOutline,
  strokeThickness: COMMON_STROKE_THICKNESS,
  letterSpacing: 5,
  fontSize: 40,
});

export const GODRAY_FILTER = new GodrayFilter({ alpha: 0.4, lacunarity: 4 });
export const BLACK_OUTLINE_FILTER = new OutlineFilter(4, COLORS.Black, 0.05);
export const WHITE_OUTLINE_FILTER = new OutlineFilter(3, COLORS.White, 0.05);
export const PURPLE_OUTLINE_FILTER = new OutlineFilter(3, COLORS.UIOutline, 0.05);
export const UI_OUTLINE_FILTER = new OutlineFilter(5, COLORS.UIOutline, 0.05);
export const SHADOW_FILTER = new DropShadowFilter();
export const COLOR_OVERLAY_FILTER_STEP_0 = new ColorOverlayFilter([0.5, 0.1, 0.1], 0.8);
export const COLOR_OVERLAY_FILTER_STEP_1 = new ColorOverlayFilter([0.5, 0.3, 0.3], 0.6);
export const COLOR_OVERLAY_FILTER_STEP_2 = new ColorOverlayFilter([0.5, 0.5, 0.5], 0.4);

export const COLOR_OVERLAY_FILTER_DARKER = new ColorOverlayFilter([0.3, 0.3, 0.3], 0.6);

export const MONSTER_LABEL = 'monster';
export const AI_SENSOR_LABEL = 'ai-sensor';
export const ATTACK_SENSOR_LABEL = 'attack_sensor';
export const USER_LABEL = 'user';

export enum Pages {
  game = 'game',
  novel = 'novel',
}
