import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Text } from '@pixi/react';

import { COLORS } from '../../../../../constants';
import { selectAppControllerScale } from '../../../../../redux/appController/selectors';
import { useFont } from '../../../../../utils/useFont';
import { Sprite } from '../../../../Sprite';
import { displayBlock } from '../../../../../redux/textBlockController';

const BADGE_SIZE = 30;
const MAIN_SPRITESHEET_URL = 'atlas';

export enum CHARACTER_TYPES {
  Healer = 'heal',
}

const BADGES = {
  [CHARACTER_TYPES.Healer]: 'healer_badge.png',
};

const TYPE_TO_NAME = {
  [CHARACTER_TYPES.Healer]: 'Поддержка',
};

type Props = {
  x: number;
  y: number;
  name: string;
  type: CHARACTER_TYPES;
};

export const CharacterName = ({ x, y, name, type }: Props) => {
  const dispatch = useDispatch();
  const widthScale = useSelector(selectAppControllerScale);

  const badgeSize = BADGE_SIZE * widthScale;

  const fontStyle = useFont({
    fill: COLORS.MainFontFill,
    stroke: COLORS.MainFontOutline,
    fontSize: badgeSize,
    strokeThickness: badgeSize / 4,
  });

  const onClick = useCallback(() => {
    dispatch(
      displayBlock({
        text: `Класс персонажа ${TYPE_TO_NAME[type]} \n\n Персонаж хорош в самолечении.`,
        x: x + badgeSize * 1.5,
        y,
      }),
    );
  }, [badgeSize, dispatch, type, x, y]);

  return (
    <Container x={x} y={y}>
      <Sprite
        x={0}
        y={badgeSize / 4}
        width={badgeSize}
        height={badgeSize}
        spritesheet={MAIN_SPRITESHEET_URL}
        textureUrl={BADGES[type]}
        onClick={onClick}
      />
      <Text x={badgeSize * 1.5} y={0} text={name} style={fontStyle} />
    </Container>
  );
};
