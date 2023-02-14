import { Container, useApp, Text } from '@inlet/react-pixi';
import React, { useCallback, useMemo, useState } from 'react';
import { PIXEL_FONT } from '../../../constants';
import { spritesheetUrl } from '../../Canvas';
import { Sprite } from '../../Sprite';
import { Button } from '../Button';
import { ButtonWithText } from '../ButtonWithText';
import { DisplayWindow } from '../DisplayWindow';
import { HeartBar } from '../HeartBar';
import { TrashCounter } from '../TrashCounter';

export const UI_SPRITESHEET = './sprites/menuAtlas.json';
const PAUSE_NAME = 'pause.png';
const MENU_NAME = 'menu.png';
const MENU_BUTTON_NAME = 'menu button.png';
const TEXTURE_URL = 'heart.png';

type Props = {
  x?: number;
  y?: number;
};

export const Menu = ({ x = 0, y = 0 }: Props) => {
  const app = useApp();
  const [isVisible, setVisible] = useState(false);
  const width = useMemo(() => {
    return app.screen.width;
  }, [app.screen.width]);

  const onClick = useCallback(() => {
    setVisible((state) => !state);
  }, []);

  return (
    // @ts-ignore
    <Container x={x} y={y} width={width} zIndex={10}>
      <Text x={90} y={10} text="Ева" style={PIXEL_FONT} />
      <HeartBar
        x={90}
        y={50}
        width={60}
        height={55}
        pad={10}
        spritesheetUrl={spritesheetUrl}
        textureUrl={TEXTURE_URL}
      />
      <TrashCounter
        x={90}
        y={120}
        height={45}
        width={50}
        spritesheetUrl={spritesheetUrl}
        pad={10}
      />
      <Button
        onClick={onClick}
        y={10}
        x={width - 110}
        width={100}
        height={100}
        spritesheetUrl={UI_SPRITESHEET}
        textureUrl={PAUSE_NAME}
        pixelised
      />
      {isVisible && (
        <DisplayWindow
          x={0}
          y={100}
          width={600}
          height={300}
          spritesheetUrl={UI_SPRITESHEET}
          menuButtonName={MENU_BUTTON_NAME}
          menuName={MENU_NAME}
          itemHeight={50}
          padding={{ left: 100, right: 100, up: 30 }}
        />
      )}
    </Container>
  );
};
