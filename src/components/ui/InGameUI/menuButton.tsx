import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Container, useApp } from '@pixi/react';
import { UI_SPRITESHEET } from '../UI';
import { Button } from '../Button';
import { DisplayWindow } from '../DisplayWindow';
import { isVisible } from '@testing-library/user-event/dist/utils';
import { __IS_DEV__ } from '../../../constants';
import { emitSignal, SignalList } from '../../../utils/signaller/emitSignal';
import { useSettings } from '../Settings/context';
import { useControlKey } from '../../../utils/useControlKey';

const PAUSE_NAME = 'pause.png';
const MENU_NAME = 'menu.png';

type Props = {
  menuButtonName: string;
};

export const MenuButton = ({ menuButtonName }: Props) => {
  const app = useApp();
  const [isVisible, setVisible] = useState(false);
  const {
    isFocusedOnMainBody,
    isCollisionVisible,
    onCollisionVisibleClick,
    onFocusedClick,
    onFPSCounterClick,
    setPaused,
  } = useSettings();

  const width = useMemo(() => {
    return app.screen.width;
  }, [app.screen.width]);

  const onClick = useCallback(() => {
    setVisible((state) => {
      setPaused(!state);
      return !state;
    });
  }, [setPaused]);

  useEffect(() => {
    const cb = (event: KeyboardEvent) => {
      if (event.code !== 'Escape') return;
      onClick();
    };

    window.addEventListener('keydown', cb);

    return () => window.removeEventListener('keydown', cb);
  }, [onClick]);

  const buttons = useMemo(() => {
    return [
      {
        text: 'Продолжить',
        onClick,
      },
      {
        text: 'Начать сначала',
        onClick: () => {
          emitSignal(SignalList.Reset);
          onClick();
        },
      },
      {
        text: 'Cчeтчик ФПС',
        onClick: onFPSCounterClick,
      },
      ...(__IS_DEV__
        ? [
            {
              text: isFocusedOnMainBody ? 'V Камера прикреплена' : 'X Камера откреплена',
              onClick: onFocusedClick,
            },
            {
              text: isCollisionVisible ? 'V Границы видны' : 'X Границы скрыты',
              onClick: onCollisionVisibleClick,
            },
          ]
        : []),
    ];
  }, [
    isCollisionVisible,
    isFocusedOnMainBody,
    onClick,
    onCollisionVisibleClick,
    onFPSCounterClick,
    onFocusedClick,
  ]);

  return (
    <Container>
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
          menuButtonName={menuButtonName}
          menuName={MENU_NAME}
          itemHeight={50}
          padding={{ left: 100, right: 100, up: 30, down: 30 }}
        >
          {[...buttons]}
        </DisplayWindow>
      )}
    </Container>
  );
};
