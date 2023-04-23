import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Text } from '@pixi/react';

import { COLORS } from '../../../../../constants';
import { selectAppControllerWidth } from '../../../../../redux/appController/selectors';
import { useFont } from '../../../../../utils/useFont';
import { Sprite } from '../../../../Sprite';

const BADGE_SIZE = 40;
const MAIN_SPRITESHEET_URL = 'atlas';

export enum CHARACTER_TYPES {
  Healer = 'heal',
}

const BADGES = {
  [CHARACTER_TYPES.Healer]: 'healer_badge.png',
};

type Props = {
  x: number;
  y: number;
  name: string;
  type: CHARACTER_TYPES;
};

export const CharacterName = ({ x, y, name, type }: Props) => {
  const width = useSelector(selectAppControllerWidth);

  const badgeSize = BADGE_SIZE * width * 0.001;

  const fontStyle = useFont({
    fill: COLORS.MainFontFill,
    stroke: COLORS.MainFontOutline,
    fontSize: badgeSize,
    strokeThickness: badgeSize / 4,
  });

  return (
    <Container x={x} y={y}>
      <Sprite
        x={0}
        y={badgeSize / 4}
        width={badgeSize}
        height={badgeSize}
        spritesheet={MAIN_SPRITESHEET_URL}
        textureUrl={BADGES[type]}
      />
      <Text x={badgeSize * 1.5} y={0} text={name} style={fontStyle} />
    </Container>
  );
};
