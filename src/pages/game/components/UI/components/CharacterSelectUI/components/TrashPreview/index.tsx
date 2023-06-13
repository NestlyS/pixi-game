import { Container, Text } from '@pixi/react';
import { useMemo } from 'react';
import {
  Filters,
  COLORS,
  BOTTLE_TEXTURE,
  CHIPS_TEXTURE,
  PAPER_TEXTURE,
} from '../../../../../../../../constants';
import { getCollectedTrash } from '../../../../../../../../redux/gamePage/utils';
import { useFont } from '../../../../../../../../utils/useFont';
import { Sprite } from '../../../../../../../../components/Sprite';

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  spritesheetUrl: string;
};

const filters = [Filters.SHADOW_FILTER, Filters.WHITE_OUTLINE_FILTER];

const CENTER_ANCHOR = {
  x: 0.5,
  y: 0.5,
};

export const TrashPreview = ({ x, y, width, height, spritesheetUrl }: Props) => {
  // TODO Заменить на useSelector
  const value = useMemo(getCollectedTrash, []);

  const fontStyle = useFont({
    fill: COLORS.ChipsFontFill,
    stroke: COLORS.ChipsFontOutline,
    fontSize: width * 0.75,
    strokeThickness: 10,
  });

  return (
    <Container zIndex={10} x={x} y={y}>
      <Sprite
        x={width / 2}
        y={-height / 2}
        pixelised
        spritesheet={spritesheetUrl}
        textureUrl={BOTTLE_TEXTURE}
        height={height}
        width={width}
        rotation={0.5}
        anchor={CENTER_ANCHOR}
        filters={filters}
      />

      <Sprite
        x={0}
        y={0}
        pixelised
        spritesheet={spritesheetUrl}
        textureUrl={CHIPS_TEXTURE}
        height={height}
        width={width}
        rotation={-0.5}
        anchor={CENTER_ANCHOR}
        filters={filters}
      />

      <Sprite
        x={width * 0.8}
        y={0}
        pixelised
        spritesheet={spritesheetUrl}
        textureUrl={PAPER_TEXTURE}
        height={height}
        width={width}
        anchor={CENTER_ANCHOR}
        filters={filters}
      />

      <Text x={width * 1.5} y={-height / 2} text={String(value ?? 0)} style={fontStyle} />
    </Container>
  );
};
