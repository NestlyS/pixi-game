import { useCallback, useEffect, useRef } from 'react';
import { useApp } from '@pixi/react';
import { useSelector } from 'react-redux';

import { useGlobalViewport } from '../../GlobalViewport/context';
import { useContainer } from './context';
import { useCatchSignal, SignalList } from '../../../utils/signaller/emitSignal';
import { selectSettingsMainBodyFocus } from '../../../redux/settings/selectors';
import {
  selectAppControllerHeight,
  selectAppControllerWidthScale,
} from '../../../redux/appController/selectors';

export const ViewController = () => {
  const { globalViewport } = useGlobalViewport();
  const height = useSelector(selectAppControllerHeight);
  const scaleWidth = useSelector(selectAppControllerWidthScale);
  const isNotFocusedOnMainBody = useSelector(selectSettingsMainBodyFocus);
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

    if (isFocused.current && isNotFocusedOnMainBody) {
      globalViewport.plugins.pause('follow');

      isFocused.current = false;
    }

    if (!isFocused.current && !isNotFocusedOnMainBody) {
      globalViewport.pivot = { x: scaleWidth * 200, y: -height / 8 };
      globalViewport.snapZoom({ height: 500 });
      globalViewport.follow(container, { speed: 500 });

      isFocused.current = true;
    }
  }, [globalViewport, isNotFocusedOnMainBody, app.stage, container, scaleWidth, height]);

  return null;
};
