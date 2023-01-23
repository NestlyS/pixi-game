import { PercentTypes } from "./typings"

export const TRAMPLIN_OPTIONS: Matter.IChamferableBodyDefinition = {
  isStatic: true,
  friction: 0,
}

export const AI_SENSOR_OPTIONS: Matter.IChamferableBodyDefinition = {
  isStatic: true,
  isSensor: true,
  friction: 0,
}

export const percents = {
  15: PercentTypes.Down,
  75: PercentTypes.Stay,
  100: PercentTypes.Up,
}
