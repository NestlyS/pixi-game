import { createContext, useContext } from "react";

interface State <T = string>{
  setAnimation: (value: T) => void
  animations: T[]
}

const initialValue = {
  setAnimation: () => {},
  animations: [],
}

const AnimationContext = createContext<State>(initialValue);

export const AnimationContextProvider = AnimationContext.Provider;

export const useAnimation = <T = string>() => {
  const {
    setAnimation,
    animations,
  } = useContext(AnimationContext);

  return {
    setAnimation: setAnimation as State<T>['setAnimation'] ?? initialValue.setAnimation,
    animations: animations as State<T>['animations'] ?? initialValue.animations,
  }
}