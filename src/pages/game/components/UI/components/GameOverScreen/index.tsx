import React, { useCallback } from 'react';
import { Container, Text } from '@pixi/react';
import {
  GAME_SPRITESHEET_URL,
  PIXEL_FONT,
  PIXEL_FONT_RED,
  PIXEL_FONT_YELLOW,
} from '../../../../../../constants';
import { ButtonWithText } from '../../../../../../components/ui/ButtonWithText';
import { SignalList, emitSignal } from '../../../../../../utils/signaller/emitSignal';
import { TrashCounter } from '../../../../../../components/ui/TrashCounter';
import { useSelector } from 'react-redux';
import {
  selectAppControllerHeight,
  selectAppControllerWidth,
} from '../../../../../../redux/appController/selectors';
import { selectMainUserTrashSum } from '../../../../../../redux/mainUser/selectors';
import { addCollectedTrash } from '../../../../../../redux/gamePage/utils';

type Props = {
  spritesheetUrl: string;
  menuButtonName: string;
};

export const GameOverScreen = ({ spritesheetUrl, menuButtonName }: Props) => {
  const width = useSelector(selectAppControllerWidth);
  const height = useSelector(selectAppControllerHeight);
  const trashSum = useSelector(selectMainUserTrashSum);

  const onClick = useCallback(() => {
    addCollectedTrash(trashSum);
    emitSignal(SignalList.Reset);
  }, [trashSum]);

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
        spritesheetUrl={GAME_SPRITESHEET_URL}
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
