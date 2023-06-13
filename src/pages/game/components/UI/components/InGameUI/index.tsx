import { Text, Container } from '@pixi/react';
import { useSelector } from 'react-redux';

import { Menu } from './components/Menu';
import { DistanceShower } from './components/DistanceShower';
import { HeartBar } from '../../../../../../components/ui/HeartBar';
import { TrashCounter } from '../../../../../../components/ui/TrashCounter';
import { MOBILE_SIZE, PIXEL_FONT, GAME_SPRITESHEET_URL } from '../../../../../../constants';
import { selectAppControllerWidth } from '../../../../../../redux/appController/selectors';
import { selectPageGamePauseState } from '../../../../../../redux/gamePage/selectors';
import { Sounds } from '../../../../../../utils/soundController';
import { useBackgroundMusic } from '../../../../../../utils/useBackgroundMusic';
import { Controls } from './components/Controls';
import { SpeedMultiplier } from '../SpeedMultiplier';

const TEXTURE_URL = 'heart.png';
const DARK_TEXTURE_URL = 'heart-empty.png';

const HEART_WIDTH = 60;
const HEART_HEIGHT = 55;
const TRASH_SIZE = 50;

export const InGameUI = () => {
  const width = useSelector(selectAppControllerWidth);
  const isPaused = useSelector(selectPageGamePauseState);
  const heartWidth = width <= MOBILE_SIZE ? HEART_WIDTH / 1.7 : HEART_WIDTH;
  const heartHeight = width <= MOBILE_SIZE ? HEART_HEIGHT / 1.7 : HEART_HEIGHT;
  const trashSize = width <= MOBILE_SIZE ? TRASH_SIZE / 1.7 : TRASH_SIZE;
  const trashYPos = width <= MOBILE_SIZE ? 100 : 120;

  useBackgroundMusic(Sounds.GameMusic, isPaused);

  return (
    <Container>
      <Text x={90} y={10} text="Ева" style={PIXEL_FONT} />
      <HeartBar
        x={90}
        y={50}
        width={heartWidth}
        height={heartHeight}
        pad={10}
        spritesheetUrl={GAME_SPRITESHEET_URL}
        textureUrl={TEXTURE_URL}
        darkTextureUrl={DARK_TEXTURE_URL}
      />
      <TrashCounter
        x={90}
        y={trashYPos}
        height={trashSize}
        width={trashSize}
        spritesheetUrl={GAME_SPRITESHEET_URL}
        pad={10}
      />
      <DistanceShower x={width - 150} y={30} />
      <Controls />
      <Menu />
      {!isPaused && <SpeedMultiplier />}
    </Container>
  );
};
