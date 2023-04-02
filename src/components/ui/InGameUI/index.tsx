import React from 'react';
import { PIXEL_FONT, __IS_DEV__ } from '../../../constants';
import { Text, Container } from '@pixi/react';
import { spritesheetUrl } from '../../Canvas';
import { HeartBar } from '../HeartBar';
import { TrashCounter } from '../TrashCounter';
import { MenuButton } from './menuButton';
import { MENU_BUTTON_NAME } from '../UI';

const TEXTURE_URL = 'heart.png';

export const InGameUI = () => {
  return (
    <Container>
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
        height={50}
        width={50}
        spritesheetUrl={spritesheetUrl}
        pad={10}
      />
      <MenuButton menuButtonName={MENU_BUTTON_NAME} />
    </Container>
  );
};
