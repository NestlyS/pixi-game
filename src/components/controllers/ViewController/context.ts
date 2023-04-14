import { DisplayObject } from 'pixi.js';
import { createContext, useContext, useRef } from 'react';

type State = DisplayObject | null;

const initialState = null;

const ContainerContext = createContext<State>(initialState);

export const ContainerContextProvider = ContainerContext.Provider;
export const useContainer = <T = DisplayObject>() => {
  const container = useContext(ContainerContext);

  return (container as T) ?? null;
};

export const useMakeContainer = <T extends DisplayObject = DisplayObject>() => {
  const ref = useRef<T | null>(null);

  return {
    ref,
    value: ref.current,
  };
};
