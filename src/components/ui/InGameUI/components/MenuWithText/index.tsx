import React, { useMemo } from 'react'
import { useScreenWidth } from '../../../../../utils/useScreenWidth'
import { DisplayWindow } from '../../../DisplayWindow';
import { MENU_BUTTON_NAME, UI_SPRITESHEET } from '../../../UI';
import { SignalList, emitSignal } from '../../../../../utils/signaller/emitSignal';
import { revertCollisions, revertFPSCounter, revertFocusOnMainBody } from '../../../../../redux/settings';
import { useDispatch, useSelector } from 'react-redux';
import { __IS_DEV__ } from '../../../../../constants';
import { selectSettingsCollisionsVisiblity, selectSettingsMainBodyFocus } from '../../../../../redux/settings/selectors';

const MENU_NAME = 'menu.png';

type Props = {
  onExit: () => void;
}

export const MenuWithText = ({
  onExit
}: Props) => {
  const screenWidth = useScreenWidth();
  const isFocusedOnMainBody = useSelector(selectSettingsMainBodyFocus);
  const isCollisionVisible = useSelector(selectSettingsCollisionsVisiblity);
  const dispatch = useDispatch();

  const buttons = useMemo(() => {
    return [
      {
        text: 'Продолжить',
        onClick: onExit,
      },
      {
        text: 'Начать сначала',
        onClick: () => {
          emitSignal(SignalList.Reset);
          onExit();
        },
      },
      {
        text: 'Cчeтчик ФПС',
        onClick: () => dispatch(revertFPSCounter()),
      },
      ...(__IS_DEV__
        ? [
          {
            text: isFocusedOnMainBody ? 'V Камера прикреплена' : 'X Камера откреплена',
            onClick: () => dispatch(revertFocusOnMainBody()),
          },
          {
            text: isCollisionVisible ? 'V Границы видны' : 'X Границы скрыты',
            onClick: () => dispatch(revertCollisions()),
          },
        ]
        : []),
    ];
  }, [
    isCollisionVisible,
    isFocusedOnMainBody,
  ]);

  return (
    <DisplayWindow
      x={screenWidth / 2 - 300}
      y={100}
      width={600}
      height={300}
      spritesheetUrl={UI_SPRITESHEET}
      menuButtonName={MENU_BUTTON_NAME}
      menuName={MENU_NAME}
      itemHeight={50}
      padding={{ left: 100, right: 100, up: 30, down: 30 }}
    >
      {[...buttons]}
    </DisplayWindow>
  )
}
