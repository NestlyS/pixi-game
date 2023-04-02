import { AnimationStepParams } from './typings';

export const SHAKE_MULTIPLIER = 7;

export const VERTICAL_SHAKING_ANIMATION: AnimationStepParams[] = [
  { position: (pos) => ({ x: pos.x, y: pos.y - 1 * SHAKE_MULTIPLIER }), time: 20 },
  { position: (pos) => ({ x: pos.x, y: pos.y + 1 * SHAKE_MULTIPLIER }), time: 20 },
  { position: (pos) => ({ x: pos.x, y: pos.y - 2 * SHAKE_MULTIPLIER }), time: 20 },
  { position: (pos) => ({ x: pos.x, y: pos.y + 2 * SHAKE_MULTIPLIER }), time: 20 },
];
