import { createContext, useContext } from "react";

export interface AnimationState <T = string>{
  setAnimation: (props: { name: T, loop?: boolean, speed?: number }) => void
  animations: T[]
}

const initialValue = {
  setAnimation: () => {},
  animations: [],
}

const AnimationContext = createContext<AnimationState>(initialValue);

export const AnimationContextProvider = AnimationContext.Provider;

export const useAnimation = <T = string>() => {
  const {
    setAnimation,
    animations,
  } = useContext(AnimationContext);

  return {
    setAnimation: setAnimation as AnimationState<T>['setAnimation'] ?? initialValue.setAnimation,
    animations: animations as AnimationState<T>['animations'] ?? initialValue.animations,
  }
}