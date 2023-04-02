import { Point } from 'pixi.js';

export type AnimationStepParams = {
  position: Point | ((position: Point) => { x: number; y: number });
  time: number;
};
