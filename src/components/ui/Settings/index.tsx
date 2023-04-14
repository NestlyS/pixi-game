import { Container, Text, useTick } from '@pixi/react';
import { TextStyle } from '@pixi/text';
import React, { useEffect, useRef, useState } from 'react';
import { useScreenWidth } from '../../../utils/useScreenWidth';
import { useSelector } from 'react-redux';
import { selectSettingsFPSCounterVisiblity } from '../../../redux/settings/selectors';

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
  const [fps, setFps] = useState(0);
  const frameCounter = useRef(0);
  const screenWidth = useScreenWidth();

  const isFPSCounterVisible = useSelector(selectSettingsFPSCounterVisiblity);

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
    <>
      {children}
      <Container x={screenWidth - 200} width={500} zIndex={100}>
        {isFPSCounterVisible && (
          <Text text={`${fps}`} style={fps > 30 ? TEXT_STYLE_POSITIVE : TEXT_STYLE_NEGATIVE} />
        )}
      </Container>
    </>
  );
};
