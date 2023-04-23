import React from 'react';
import { Text, Container } from '@pixi/react';
import { useSelector } from 'react-redux';

import { MOBILE_SIZE, PIXEL_FONT } from '../../../constants';
import { spritesheetUrl } from '../../../pages/game';
import { HeartBar } from '../HeartBar';
import { TrashCounter } from '../TrashCounter';
import { Menu } from './components/Menu';
import { Controls } from '../Controls';
import { DistanceShower } from './components/DistanceShower';

import { selectAppControllerWidth } from '../../../redux/appController/selectors';

const TEXTURE_URL = 'heart.png';
const DARK_TEXTURE_URL = 'heart-empty.png';

const HEART_WIDTH = 60;
const HEART_HEIGHT = 55;
const TRASH_SIZE = 50;

export const InGameUI = () => {
  const width = useSelector(selectAppControllerWidth);
  const heartWidth = width <= MOBILE_SIZE ? HEART_WIDTH / 1.7 : HEART_WIDTH;
  const heartHeight = width <= MOBILE_SIZE ? HEART_HEIGHT / 1.7 : HEART_HEIGHT;
  const trashSize = width <= MOBILE_SIZE ? TRASH_SIZE / 1.7 : TRASH_SIZE;
  const trashYPos = width <= MOBILE_SIZE ? 100 : 120;

  return (
    <Container>
      <Text x={90} y={10} text="Ева" style={PIXEL_FONT} />
      <HeartBar
        x={90}
        y={50}
        width={heartWidth}
        height={heartHeight}
        pad={10}
        spritesheetUrl={spritesheetUrl}
        textureUrl={TEXTURE_URL}
        darkTextureUrl={DARK_TEXTURE_URL}
      />
      <TrashCounter
        x={90}
        y={trashYPos}
        height={trashSize}
        width={trashSize}
        spritesheetUrl={spritesheetUrl}
        pad={10}
      />
      <DistanceShower x={width - 150} y={30} />
      <Menu />
      <Controls />
    </Container>
  );
};
