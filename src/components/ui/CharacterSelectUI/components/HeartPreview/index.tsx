import { Container, Text } from '@pixi/react';
import { Sprite } from '../../../../Sprite';
import { useFont } from '../../../../../utils/useFont';
import { COLORS, Filters } from '../../../../../constants';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { displayBlock } from '../../../../../redux/textBlockController';

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
  spritesheetUrl: string;
  textureUrl: string;
};

const filters = [Filters.SHADOW_FILTER];

export const HeartPreview = ({ x, y, width, height, value, spritesheetUrl, textureUrl }: Props) => {
  const dispatch = useDispatch();

  const fontStyle = useFont({
    fill: COLORS.White,
    stroke: COLORS.UIOutline,
    fontSize: width / 2,
    strokeThickness: 10,
  });

  const onClick = useCallback(() => {
    dispatch(displayBlock({ text: `Здоровье персонажа (${3})`, x: x + width * 1.2, y }));
  }, [dispatch, width, x, y]);

  return (
    <Container zIndex={10}>
      <Sprite
        x={x}
        y={y}
        pixelised
        spritesheet={spritesheetUrl}
        textureUrl={textureUrl}
        height={height}
        width={width}
        filters={filters}
        onClick={onClick}
      />
      <Text x={x + width / 2} y={y + height / 2} text={String(value)} style={fontStyle} />
    </Container>
  );
};
