import { Container, Text, useApp, useTick } from '@inlet/react-pixi';
import { TextStyle } from '@pixi/text';
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useEffect } from 'react';
import { initialState, SettingsContextProvider } from './context'

const TEXT_STYLE_POSITIVE = new TextStyle({
  fill: ['#41bc66'],
  align: 'left',
});

const TEXT_STYLE_NEGATIVE = new TextStyle({
  fill: ['#bb2222'],
  align: 'left',
});

type Props = {
  children?: React.ReactElement,
}

export const Settings = ({
  children
}: Props) => {
  const [isFocusedOnMainBody, setFocused ] = useState(initialState.isFocusedOnMainBody);
  const [isCollisionVisible, setCollisionVisible ] = useState(initialState.isCollisionVisible);
  const [fps, setFps] = useState(0);
  const frameCounter = useRef(0);
  const app = useApp();

  const onFocusedClick = useCallback(() => {
    setFocused(val => !val);
  }, []);

  const onCollisionVisibleClick = useCallback(() => {
    setCollisionVisible(val => !val);
  }, []);

  const value = useMemo(() => ({
    isFocusedOnMainBody,
    isCollisionVisible,
  }), [isFocusedOnMainBody, isCollisionVisible]);

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

  console.log(app.renderer.width, app.view.width)

  return (
    <SettingsContextProvider value={value}>
      {/* @ts-ignore */}
      <Container x={app.view.width - 200}>
        <Text text={`${fps}`} style={fps > 30 ? TEXT_STYLE_POSITIVE : TEXT_STYLE_NEGATIVE} />
        <Text y={30} text={ isFocusedOnMainBody ? 'Камера прикреплена' : 'Камера откреплена'} style={isFocusedOnMainBody ? TEXT_STYLE_POSITIVE : TEXT_STYLE_NEGATIVE} interactive click={onFocusedClick}/>
        <Text y={60} text={ isCollisionVisible ? 'Границы коллизии видимы' : 'Границы коллизии невидимы'} style={isFocusedOnMainBody ? TEXT_STYLE_POSITIVE : TEXT_STYLE_NEGATIVE} interactive click={onCollisionVisibleClick}/>
      </Container>
      {children}
    </SettingsContextProvider>
  )
}
