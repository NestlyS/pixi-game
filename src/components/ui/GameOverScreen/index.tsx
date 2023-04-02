import React, { useCallback, useMemo } from 'react';
import { Container, Text, useApp } from '@pixi/react';
import {
  PIXEL_FONT,
  PIXEL_FONT_GREEN,
  PIXEL_FONT_RED,
  PIXEL_FONT_YELLOW,
} from '../../../constants';
import { ButtonWithText } from '../ButtonWithText';
import { SignalList, emitSignal } from '../../../utils/signaller/emitSignal';
import { TrashCounter } from '../TrashCounter';
import { spritesheetUrl as _spritesheetUrl } from '../../Canvas';

type Props = {
  spritesheetUrl: string;
  menuButtonName: string;
};

export const GameOverScreen = ({ spritesheetUrl, menuButtonName }: Props) => {
  const app = useApp();
  const width = useMemo(() => {
    return app.screen.width;
  }, [app.screen.width]);
  const height = useMemo(() => {
    return app.screen.height;
  }, [app.screen.height]);

  const onClick = useCallback(() => {
    emitSignal(SignalList.Reset);
  }, []);

  return (
    <Container>
      <Text
        text="Больше нет сил бежать"
        style={PIXEL_FONT_RED}
        x={width / 2 - 400}
        y={height / 4}
      />
      <Text text="Вы собрали:" style={PIXEL_FONT_YELLOW} x={width / 2 - 170} y={height / 3} />
      <TrashCounter
        x={width / 2 - 170}
        y={height / 2.5}
        height={50}
        width={50}
        spritesheetUrl={_spritesheetUrl}
        pad={10}
      />
      <ButtonWithText
        x={width / 2 - 250}
        y={height / 2}
        width={500}
        height={70}
        marginTop={20}
        marginLeft={40}
        spritesheetUrl={spritesheetUrl}
        textureUrl={menuButtonName}
        fontStyle={PIXEL_FONT}
        onClick={onClick}
      >
        Начать сначала
      </ButtonWithText>
    </Container>
  );
};
