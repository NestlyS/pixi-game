import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Viewport as PixiViewport } from 'pixi-viewport';
import { useSelector } from 'react-redux';
import Viewport from '../../customPixiReact/ViewPort';
import { GlobalViewportContextProvider } from './context';
import { selectSettingsMainBodyFocus } from '../../redux/settings/selectors';
import { GlobalViewportControls } from './components/GlobalViewportControls';

type Props = {
  width: number;
  height: number;
  children: React.ReactNode;
  outsideViewport?: React.ReactNode;
};

export const GlobalViewport = ({ width, height, children, outsideViewport }: Props) => {
  const viewportRef = useRef<PixiViewport>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isNotFocusedOnMainBody = useSelector(selectSettingsMainBodyFocus);

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
      {isNotFocusedOnMainBody && <GlobalViewportControls viewport={viewportRef.current} />}
      <Viewport ref={viewportRef} width={width} height={height}>
        {children}
      </Viewport>
    </GlobalViewportContextProvider>
  );
};
