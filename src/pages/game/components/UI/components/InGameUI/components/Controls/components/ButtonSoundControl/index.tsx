import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import {
  ButtonWithSprite,
  Props as ButtonProps,
} from '../../../../../../../../../../components/ui/ButtonWithSprite';
import { UI_SPRITESHEET_URL } from '../../../../../../../../../../constants';
import { revertSoundState } from '../../../../../../../../../../redux/appController';
import { selectAppControllerIsSoundsEnabled } from '../../../../../../../../../../redux/appController/selectors';

type Props = Omit<Omit<ButtonProps, 'spriteUrl'>, 'spritesheetUrl'>;

const SOUND_ON_TEXTURE = 'sound1.png';
const SOUND_OFF_TEXTURE = 'sound2.png';

export const ButtonSoundControl = (props: Props) => {
  const isSoundOn = useSelector(selectAppControllerIsSoundsEnabled);
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(revertSoundState());
  }, [dispatch]);

  return (
    <ButtonWithSprite
      onClick={onClick}
      spriteUrl={isSoundOn ? SOUND_ON_TEXTURE : SOUND_OFF_TEXTURE}
      spritesheetUrl={UI_SPRITESHEET_URL}
      {...props}
    />
  );
};
