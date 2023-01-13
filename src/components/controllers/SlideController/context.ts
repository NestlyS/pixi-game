import { createContext, useContext } from "react";

type SlidingState = boolean;

export const initialState = false;

const SlidingContext = createContext<SlidingState>(initialState);

export const SlidingContextProvider = SlidingContext.Provider;
export const useSliding = () => {
  const isSliding = useContext(SlidingContext);

  return isSliding;
}