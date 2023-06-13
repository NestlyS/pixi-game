import { useSelector } from 'react-redux';
import { ButtonReset } from './components/ButtonReset';
import { ButtonContinue } from './components/ButtonContinue';
import { SwitchAutorun } from './components/SwitchAutorun';
import { SwitchFPS } from './components/SwitchFPS';
import { SwitchCollisions } from './components/SwitchCollisions';
import { SwitchFocused } from './components/SwitchFocused';
import { ButtonRow } from './components/ButtonRow';
import { DisplayWindow } from '../../../../../../../../components/ui/DisplayWindow';
import { UI_SPRITESHEET_URL, __IS_DEV__ } from '../../../../../../../../constants';
import {
  selectAppControllerWidth,
  selectAppControllerHeight,
} from '../../../../../../../../redux/appController/selectors';
import { ButtonSoundControl } from '../Controls/components/ButtonSoundControl';
import { ButtonMusicControl } from '../Controls/components/ButtonMusicControl';

const MENU_NAME = 'menu.png';

type Props = {
  onExit: () => void;
};

export const MenuWithText = ({ onExit }: Props) => {
  const screenWidth = useSelector(selectAppControllerWidth);
  const screenHeight = useSelector(selectAppControllerHeight);

  const windowWidth = screenWidth * 0.6;
  const buttonHeight = screenHeight * 0.07;

  return (
    <DisplayWindow
      x={(screenWidth - windowWidth) * 0.55}
      y={0}
      width={windowWidth}
      height={screenHeight}
      spritesheetUrl={UI_SPRITESHEET_URL}
      menuName={MENU_NAME}
      itemHeight={buttonHeight}
      padding={{
        left: screenWidth * 0.11,
        right: screenWidth * 0.11,
        up: screenHeight * 0.1,
        down: screenHeight * 0.1,
      }}
      onExit={onExit}
    >
      <ButtonContinue onExit={onExit} />
      <ButtonReset onExit={onExit} />
      <SwitchFPS />
      <SwitchAutorun />
      {__IS_DEV__ && <SwitchCollisions />}
      {__IS_DEV__ && <SwitchFocused />}
      <ButtonRow childrenWidth={buttonHeight * 2}>
        <ButtonSoundControl width={buttonHeight * 1.5} height={buttonHeight * 1.5} x={0} y={0} />
        <ButtonMusicControl width={buttonHeight * 1.5} height={buttonHeight * 1.5} x={0} y={0} />
      </ButtonRow>
    </DisplayWindow>
  );
};
