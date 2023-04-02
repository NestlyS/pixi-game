import { Container, Text, useApp, useTick } from '@pixi/react';
import { TextStyle } from '@pixi/text';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';
import { __IS_DEV__ } from '../../../constants';
import { initialState, PausedContextProvider, SettingsContextProvider } from './context';

const TEXT_STYLE_POSITIVE = new TextStyle({
  fontFamily: 'Press Start 2P',
  fill: ['#41bc66'],
  align: 'left',
  stroke: '#223',
  strokeThickness: 5,
});

const TEXT_STYLE_NEGATIVE = new TextStyle({
  fontFamily: 'Press Start 2P',
  fill: ['#bb2222'],
  stroke: '#223',
  strokeThickness: 5,
});

type Props = {
  children?: React.ReactElement;
};

export const Settings = ({ children }: Props) => {
  const [isFocusedOnMainBody, setFocused] = useState(initialState.isFocusedOnMainBody);
  const [isCollisionVisible, setCollisionVisible] = useState<boolean>(
    initialState.isCollisionVisible,
  );
  const [isFPSCounterVisible, setFPSCounterVisible] = useState<boolean>(true);
  const [isPaused, setPaused] = useState(false);
  const [fps, setFps] = useState(0);
  const frameCounter = useRef(0);
  const app = useApp();

  const onFocusedClick = useCallback(() => {
    setFocused((val) => !val);
  }, []);

  const onCollisionVisibleClick = useCallback(() => {
    setCollisionVisible((val) => !val);
  }, []);

  const onFPSCounterClick = useCallback(() => {
    setFPSCounterVisible((val) => !val);
  }, []);

  const value = useMemo(
    () => ({
      isFocusedOnMainBody,
      onFocusedClick,
      setPaused,
      isCollisionVisible,
      onCollisionVisibleClick,
      onFPSCounterClick,
    }),
    [
      isFocusedOnMainBody,
      onFocusedClick,
      isCollisionVisible,
      onCollisionVisibleClick,
      onFPSCounterClick,
    ],
  );

  useEffect(() => {
    const id = setInterval(() => {
      setFps(frameCounter.current);
      frameCounter.current = 0;
    }, 1000);

    return () => clearInterval(id);
  }, []);

  useTick(() => {
    frameCounter.current += 1;
  });

  return (
    <SettingsContextProvider value={value}>
      <PausedContextProvider value={isPaused}>
        {/* @ts-ignore */}
        {children}
      </PausedContextProvider>
      <Container x={app.view.width - 200} width={500} zIndex={100}>
        {isFPSCounterVisible && (
          <Text text={`${fps}`} style={fps > 30 ? TEXT_STYLE_POSITIVE : TEXT_STYLE_NEGATIVE} />
        )}
      </Container>
    </SettingsContextProvider>
  );
};
