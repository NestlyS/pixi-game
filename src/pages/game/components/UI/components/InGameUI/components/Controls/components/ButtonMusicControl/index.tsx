import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import {
  ButtonWithSprite,
  Props as ButtonProps,
} from '../../../../../../../../../../components/ui/ButtonWithSprite';
import { UI_SPRITESHEET_URL } from '../../../../../../../../../../constants';
import { revertMusicState } from '../../../../../../../../../../redux/appController';
import { selectAppControllerIsMusicEnabled } from '../../../../../../../../../../redux/appController/selectors';

type Props = Omit<Omit<ButtonProps, 'spriteUrl'>, 'spritesheetUrl'>;

const MUSIC_ON_TEXTURE = 'music1.png';
const MUSIC_OFF_TEXTURE = 'music2.png';

export const ButtonMusicControl = (props: Props) => {
  const isMusicOn = useSelector(selectAppControllerIsMusicEnabled);
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(revertMusicState());
  }, [dispatch]);

  return (
    <ButtonWithSprite
      onClick={onClick}
      spriteUrl={isMusicOn ? MUSIC_ON_TEXTURE : MUSIC_OFF_TEXTURE}
      spritesheetUrl={UI_SPRITESHEET_URL}
      {...props}
    />
  );
};
