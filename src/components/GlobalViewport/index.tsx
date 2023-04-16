import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Viewport as PixiViewport } from 'pixi-viewport';
import Viewport from '../../customPixiReact/ViewPort';
import { GlobalViewportContextProvider } from './context';
import { useGlobalViewportControls } from './hooks';
import { selectSettingsMainBodyFocus } from '../../redux/settings/selectors';

type Props = {
  width: number;
  height: number;
  children: React.ReactNode;
  outsideViewport?: React.ReactNode;
};

export const GlobalViewport = ({ width, height, children, outsideViewport }: Props) => {
  const viewportRef = useRef<PixiViewport>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isFocusedOnMainBody = useSelector(selectSettingsMainBodyFocus);

  useGlobalViewportControls(viewportRef.current, isFocusedOnMainBody);

  useEffect(() => setIsMounted(true), []);

  const value = useMemo(
    () => ({
      globalViewport: viewportRef.current,
    }),
    [isMounted],
  );

  return (
    <GlobalViewportContextProvider value={value}>
      {outsideViewport}
      <Viewport ref={viewportRef} width={width} height={height}>
        {children}
      </Viewport>
    </GlobalViewportContextProvider>
  );
};
