import { _ReactPixi } from '@inlet/react-pixi';
import { DisplayObject } from 'pixi.js';
import { createContext, useContext, useMemo, useRef } from 'react';

type State = {
  container: DisplayObject | null;
}

const initialState = {
  container: null,
}

const ContainerContext = createContext<State>(initialState);

export const ContainerContextProvider = ContainerContext.Provider;
export const useContainer = () => {
  const {
    container
  } = useContext(ContainerContext);

  return { container: container ?? null };
}

export const useMakeContainer = <T extends DisplayObject = DisplayObject>() => {
  const ref = useRef<T | null>(null);
  const value = useMemo(() => ({
    container: ref.current
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [ref.current]);

  return {
    ref,
    value
  }
}
