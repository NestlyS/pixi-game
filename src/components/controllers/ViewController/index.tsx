import { useEffect, useRef } from 'react';
import { useGlobalViewport } from '../../GlobalViewport/context';
import { useSettings } from '../../ui/Settings/context';
import { useApp } from '@inlet/react-pixi';
import { useContainer } from './context';
import { WORLD_HEIGHT, WORLD_WIDTH } from '../../../App';

export const ViewController = () => {
  const { globalViewport } = useGlobalViewport();
  const { isFocusedOnMainBody } = useSettings();
  const container = useContainer();

  const isFocused = useRef<boolean>(false);
  const app = useApp();

  console.log(container, 'CONTAINER');

  useEffect(() => {
    if (!globalViewport || !container) {
      return;
    }

    if (isFocused.current && !isFocusedOnMainBody) {
      globalViewport.pivot = { x: 0, y: 0 };
      globalViewport.snapZoom({ width: WORLD_WIDTH, height: WORLD_HEIGHT });
      globalViewport.plugins.pause('follow');

      isFocused.current = false;
    }

    console.log(container);

    if (!isFocused.current && isFocusedOnMainBody) {
      globalViewport.pivot = { x: 0, y: -container.y * 0.75 };
      globalViewport.snapZoom({ width: WORLD_WIDTH / 3, height: WORLD_HEIGHT / 1.5 });
      globalViewport.follow(container, { speed: 35 });

      isFocused.current = true;
    }
  }, [globalViewport, isFocusedOnMainBody, app.stage, container]);

  return null;
};
