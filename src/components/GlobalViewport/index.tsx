import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Viewport as PixiViewport } from 'pixi-viewport';
import Viewport from '../../customPixiReact/ViewPort';
import { useBodyParams } from '../Body/context';
import { GlobalViewportContextProvider } from './context';
import { useSettings } from '../ui/Settings/context';
import { useControlKey } from '../../utils/useControlKey';
import { useGlobalViewportControls } from './hooks';

type Props = {
  width: number;
  height: number;
  children: React.ReactNode;
};

const plugins = ['drag', 'wheel', 'pinch'] as ('drag' | 'wheel' | 'pinch')[];

export const GlobalViewport = ({ width, height, children }: Props) => {
  const viewportRef = useRef<PixiViewport>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { isFocusedOnMainBody } = useSettings();

  useGlobalViewportControls(viewportRef.current, isFocusedOnMainBody);

  useEffect(() => setIsMounted(true), []);

  const value = useMemo(
    () => ({
      globalViewport: viewportRef.current,
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }),
    [isMounted],
  );

  return (
    <Viewport ref={viewportRef} width={width} height={height}>
      <GlobalViewportContextProvider value={value}>{children}</GlobalViewportContextProvider>
    </Viewport>
  );
};
