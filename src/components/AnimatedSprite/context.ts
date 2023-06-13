import { Filter } from 'pixi.js';
import { createContext, useContext } from 'react';
import { Filters } from '../../constants';

export interface AnimationState<T = string> {
  setAnimation: (props: { name: T; loop?: boolean; speed?: number; _filters?: Filters[] }) => void;
  onComplete: (
    cb: (currentAnimationName: string | null, isLoop: boolean) => void,
    once?: boolean,
  ) => void;
  clearOnComplete: (cb: (currentAnimationName: string | null) => void) => void;
  animations: T[];
}

const initialValue = {
  setAnimation: () => {},
  onComplete: () => {},
  clearOnComplete: () => {},
  animations: [],
};

const AnimationContext = createContext<AnimationState>(initialValue);

export const AnimationContextProvider = AnimationContext.Provider;

export const useAnimation = <T = string>() => {
  const { setAnimation, onComplete, clearOnComplete, animations } = useContext(AnimationContext);

  return {
    setAnimation: (setAnimation as AnimationState<T>['setAnimation']) ?? initialValue.setAnimation,
    onComplete,
    clearOnComplete,
    animations: (animations as AnimationState<T>['animations']) ?? initialValue.animations,
  };
};
