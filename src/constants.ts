import { TextStyle } from 'pixi.js';
import {
  ColorGradientFilter,
  ColorOverlayFilter,
  DropShadowFilter,
  GodrayFilter,
  OutlineFilter,
} from 'pixi-filters';

export const EPS = 0.03;
export const ONE_CIRCLE_IN_RAD = 6.28;
export const ONE_CIRCLE_IN_DEGREES = 360;
export const MOBILE_SIZE = 800;

// export const DEFAULT_WORLD_WIDTH = 1600;
// export const DEFAULT_WORLD_HEIGHT = 900;
export const DEFAULT_WORLD_WIDTH = 667;
export const DEFAULT_WORLD_HEIGHT = 375;

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
  HintBlockOutline = 0xcfc5a1,
  HintBlockFill = 0x453b33,
  TextBlockFill = 0xffe0bc,
  TextBlockSecondFill = 0xf4b2b1,
  TextPositiveFill = 0x41bc66,
  TextNegativeFill = 0xbb2222,
  DangerOutline = 0xbd2430,
  BuffOutline = 0x7df740,
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

export enum Filters {
  GODRAY_FILTER,
  BLACK_OUTLINE_FILTER,
  GREEN_OUTLINE_FILTER,
  WHITE_OUTLINE_FILTER,
  PURPLE_OUTLINE_FILTER,
  RED_OUTLINE_FILTER,
  UI_OUTLINE_FILTER,
  HINT_BLOCK_OUTLINE_FILTER,
  SHADOW_FILTER,
  COLOR_OVERLAY_FILTER_STEP_0,
  COLOR_OVERLAY_FILTER_STEP_1,
  COLOR_OVERLAY_FILTER_STEP_2,
  COLOR_OVERLAY_FILTER_DARKER,
  COLOR_GRADIENT_FILTER,
  UI_GRADIENT_FILTER,
}

export const FILTERS = {
  [Filters.GODRAY_FILTER]: new GodrayFilter({ alpha: 0.4, lacunarity: 4 }),
  [Filters.BLACK_OUTLINE_FILTER]: new OutlineFilter(4, COLORS.Black, 0.05),
  [Filters.GREEN_OUTLINE_FILTER]: new OutlineFilter(4, COLORS.BuffOutline, 0.05),
  [Filters.WHITE_OUTLINE_FILTER]: new OutlineFilter(3, COLORS.White, 0.05),
  [Filters.PURPLE_OUTLINE_FILTER]: new OutlineFilter(3, COLORS.UIOutline, 0.05),
  [Filters.RED_OUTLINE_FILTER]: new OutlineFilter(6, COLORS.DangerOutline, 0.05),
  [Filters.UI_OUTLINE_FILTER]: new OutlineFilter(5, COLORS.UIOutline, 0.05),
  [Filters.HINT_BLOCK_OUTLINE_FILTER]: new OutlineFilter(5, COLORS.HintBlockOutline, 0.05),
  [Filters.SHADOW_FILTER]: new DropShadowFilter(),
  [Filters.COLOR_OVERLAY_FILTER_STEP_0]: new ColorOverlayFilter([0.5, 0.1, 0.1], 0.8),
  [Filters.COLOR_OVERLAY_FILTER_STEP_1]: new ColorOverlayFilter([0.5, 0.3, 0.3], 0.6),
  [Filters.COLOR_OVERLAY_FILTER_STEP_2]: new ColorOverlayFilter([0.5, 0.5, 0.5], 0.4),
  [Filters.COLOR_OVERLAY_FILTER_DARKER]: new ColorOverlayFilter([0.3, 0.3, 0.3], 0.6),
  [Filters.COLOR_GRADIENT_FILTER]: new ColorGradientFilter({
    type: ColorGradientFilter.LINEAR,
    stops: [
      { offset: 0.7, color: COLORS.TextBlockFill, alpha: 0 },
      { offset: 1.0, color: COLORS.TextBlockSecondFill, alpha: 1 },
    ],
    angle: 180,
    alpha: 0.7,
  }),
  [Filters.UI_GRADIENT_FILTER]: new ColorGradientFilter({
    type: ColorGradientFilter.LINEAR,
    stops: [
      { offset: 0.0, color: COLORS.TextBlockFill, alpha: 1 },
      { offset: 0.6, color: COLORS.TextBlockSecondFill, alpha: 0.5 },
    ],
    angle: 180,
    alpha: 0.7,
  }),
};

export const MONSTER_LABEL = 'monster';
export const AI_SENSOR_LABEL = 'ai-sensor';
export const ATTACK_SENSOR_LABEL = 'attack_sensor';
export const USER_LABEL = 'user';

export enum Pages {
  game = 'game',
  novel = 'novel',
  startScreen = 'startScreen',
}

export const UI_SPRITESHEET_URL = './sprites/menuAtlas.json';
export const START_SCREEN_SPRITESHEET_URL = './sprites/start_screen.json';
export const NOVEL_SPRITESHEET_URL = './novel/novel.json';
export const GAME_SPRITESHEET_URL = './sprites/atlas.json';
export const TILE_SIZE = 80;

export const GLOBAL_HIT_AREA = {
  contains: () => true,
};
