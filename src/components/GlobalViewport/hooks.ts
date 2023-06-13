import { Viewport } from 'pixi-viewport';
import { useCallback, useEffect, useState } from 'react';
import { useControlKey } from '../../utils/useControlKey';
import { VERTICAL_SHAKING_ANIMATION } from './constants';
import { useGlobalViewport } from './context';
import { animateViewport } from './utils';

export const useGlobalViewportControls = (viewport: Viewport | null) => {
  const DCb = useCallback(() => {
    if (!viewport) {
      return;
    }

    viewport.animate({ time: 300, position: { x: 300 + viewport.center.x, y: viewport.center.y } });
  }, [viewport]);

  const ACb = useCallback(() => {
    if (!viewport) {
      return;
    }

    viewport.animate({ time: 300, position: { x: viewport.center.x - 300, y: viewport.center.y } });
  }, [viewport]);

  const SCb = useCallback(() => {
    if (!viewport) {
      return;
    }

    viewport.animate({ time: 300, position: { x: viewport.center.x, y: viewport.center.y + 300 } });
  }, [viewport]);

  const WCb = useCallback(() => {
    if (!viewport) {
      return;
    }

    viewport.animate({ time: 300, position: { x: viewport.center.x, y: viewport.center.y - 300 } });
  }, [viewport]);

  useControlKey('ArrowRight', DCb);
  useControlKey('ArrowLeft', ACb);
  useControlKey('ArrowUp', WCb);
  useControlKey('ArrowDown', SCb);
};

export const useGlobalViewportShaking = () => {
  const { globalViewport } = useGlobalViewport();
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    // При renderKey === 0 анимация не должна срабатывать
    if (!globalViewport || !renderKey) {
      return;
    }

    animateViewport(globalViewport, VERTICAL_SHAKING_ANIMATION);
  }, [globalViewport, renderKey]);

  const shakeViewport = useCallback(() => {
    setRenderKey((val) => val + 1);
  }, []);

  return shakeViewport;
};
