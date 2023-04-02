import { useCallback, useEffect, useRef } from 'react';
import { Point } from 'pixi.js';
import { useGlobalViewport } from '../../GlobalViewport/context';
import { useSettings } from '../../ui/Settings/context';
import { useApp } from '@pixi/react';
import { useContainer } from './context';
import { WORLD_HEIGHT } from '../../../App';
import { Body } from 'matter-js';
import { useCatchSignal, SignalList } from '../../../utils/signaller/emitSignal';

export const ViewController = () => {
  const { globalViewport } = useGlobalViewport();
  const { isFocusedOnMainBody } = useSettings();
  const container = useContainer();

  const isFocused = useRef<boolean>(false);
  const app = useApp();

  const cb = useCallback(() => {
    if (!globalViewport || !container) return;

    globalViewport.plugins.pause('follow');
    globalViewport.moveCenter(container.x, container.y);
    globalViewport.follow(container, { speed: 150 });
  }, [container, globalViewport]);
  useCatchSignal(SignalList.Reset, cb);

  useEffect(() => {
    if (!globalViewport || !container) {
      return;
    }

    if (isFocused.current && !isFocusedOnMainBody) {
      globalViewport.plugins.pause('follow');

      isFocused.current = false;
    }

    if (!isFocused.current && isFocusedOnMainBody) {
      globalViewport.pivot = { x: 0, y: -WORLD_HEIGHT / 6 };
      globalViewport.snapZoom({ height: 500 });
      globalViewport.follow(container, { speed: 500 });

      isFocused.current = true;
    }
  }, [globalViewport, isFocusedOnMainBody, app.stage, container]);

  return null;
};
