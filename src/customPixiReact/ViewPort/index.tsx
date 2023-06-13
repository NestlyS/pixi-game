import React, { forwardRef } from 'react';
import * as PIXI from 'pixi.js';
import { PixiComponent, useApp } from '@pixi/react';
import { Viewport as PixiViewport } from 'pixi-viewport';

export interface ViewportProps {
  width: number;
  height: number;
  plugin?: ('drag' | 'pinch' | 'wheel' | 'clampZoom')[];
  children?: React.ReactNode;
}

export interface PixiComponentViewportProps extends ViewportProps {
  app: PIXI.Application;
}

const PixiComponentViewport = PixiComponent('Viewport', {
  create: ({ width, height, app, plugin }: PixiComponentViewportProps) => {
    const viewport = new PixiViewport({
      screenWidth: width,
      screenHeight: height,
      worldWidth: width * 4,
      worldHeight: height * 4,
      ticker: app.ticker,
      interaction: app.renderer.plugins.interaction,
    });

    plugin?.forEach((plugin) => {
      if (plugin === 'clampZoom') {
        viewport[plugin]({});
        return;
      }

      viewport[plugin]();
    });

    return viewport;
  },
});

const Viewport = React.memo(
  forwardRef<PixiViewport, ViewportProps>((props, ref) => {
    const app = useApp();
    return <PixiComponentViewport ref={ref} app={app} {...props} />;
  }),
);

export default Viewport;
