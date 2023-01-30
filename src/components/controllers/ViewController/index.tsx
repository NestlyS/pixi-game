import { useEffect, useRef } from 'react';
import { useGlobalViewport } from '../../GlobalViewport/context';
import { useSettings } from '../../Settings/context';
import { useApp } from '@inlet/react-pixi';
import { WORLD_HEIGHT, WORLD_WIDTH } from '../../../constants';
import { useContainer } from './context';

export const ViewController = () => {
  const {
    globalViewport
  } = useGlobalViewport();
  const {
    isFocusedOnMainBody
  } = useSettings();
  const container = useContainer();

  const isFocused = useRef<boolean>(false);
  const app = useApp();

  console.log(container, 'CONTAINER');

  useEffect(() => {
    if (!globalViewport || !container) { return; }

    if (isFocused.current && !isFocusedOnMainBody) {
      globalViewport.pivot = {x: 0, y: 0}
      globalViewport.snapZoom({ width: 900, height: 900 })
      globalViewport.plugins.pause('follow');

      isFocused.current = false;
    }

    console.log(container);

    if (!isFocused.current && isFocusedOnMainBody) {
      globalViewport.pivot = {x: 0, y: -container.y * 2}
      globalViewport.snapZoom({ width: 300, height: 300 });
      globalViewport.follow(container, { speed: 35});

      isFocused.current = true;
    }
  }, [globalViewport, isFocusedOnMainBody, app.stage, container]);

  return null;
}
