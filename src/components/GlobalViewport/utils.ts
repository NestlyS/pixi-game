import { Viewport } from 'pixi-viewport';
import { AnimationStepParams } from './typings';

export const animateViewport = (
  viewport: Viewport,
  steps: AnimationStepParams[],
  callbackOnComplete: () => void = () => {},
) => {
  viewport.animate({
    time: steps[0].time,
    position:
      typeof steps[0].position === 'function'
        ? steps[0].position(viewport.center)
        : steps[0].position,
    callbackOnComplete: (vp) =>
      steps.length <= 1
        ? callbackOnComplete()
        : animateViewport(vp, steps.slice(1), callbackOnComplete),
  });
};
