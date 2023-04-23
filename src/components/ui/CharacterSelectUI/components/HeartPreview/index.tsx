import { Container, Text } from '@pixi/react';
import { Sprite } from '../../../../Sprite';
import { useFont } from '../../../../../utils/useFont';
import { COLORS, SHADOW_FILTER } from '../../../../../constants';

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  value: number;
  spritesheetUrl: string;
  textureUrl: string;
};

export const HeartPreview = ({ x, y, width, height, value, spritesheetUrl, textureUrl }: Props) => {
  const fontStyle = useFont({
    fill: COLORS.White,
    stroke: COLORS.UIOutline,
    fontSize: width / 2,
    strokeThickness: 10,
  });

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
        filters={[SHADOW_FILTER]}
      />
      <Text x={x + width / 2} y={y + height / 2} text={String(value)} style={fontStyle} />
    </Container>
  );
};
