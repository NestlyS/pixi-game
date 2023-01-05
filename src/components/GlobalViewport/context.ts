import React, { useContext } from 'react';
import { Viewport } from 'pixi-viewport';

type Props = {
  globalViewport: Viewport | null;
}

const initialState = {
  globalViewport: null,
}

const GlobalViewportContext = React.createContext<Props>(initialState);

export const GlobalViewportContextProvider = GlobalViewportContext.Provider;
export const GlobalViewportContextConsumer = GlobalViewportContext.Consumer;
export const useGlobalViewport = () => {
  const props = useContext(GlobalViewportContext);

  return {
    globalViewport: props.globalViewport ?? null
  }
}