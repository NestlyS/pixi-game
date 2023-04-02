import { Text, Container } from '@pixi/react';
import { PIXEL_FONT } from '../../../constants';
import { Sprite } from '../../Sprite';
import { Button } from '../Button';
import { ButtonWithText } from '../ButtonWithText';

const BETWEEN_ITEMS_PAD = 20;

const DEFAULT_PADDING = { left: 0, down: 0, right: 0, up: 0 };

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  spritesheetUrl: string;
  menuButtonName: string;
  menuName: string;
  padding?: { left?: number; down?: number; right?: number; up?: number };
  itemHeight?: number;
  children?: { text: string; onClick: () => void }[];
};

export const DisplayWindow = ({
  x,
  y,
  width,
  height,
  menuButtonName,
  menuName,
  spritesheetUrl,
  padding = DEFAULT_PADDING,
  itemHeight = 80,
  children,
}: Props) => {
  const innerPadding = { ...DEFAULT_PADDING, ...padding };
  const itemWidth = width - innerPadding.left - innerPadding.right;

  return (
    // @ts-ignore
    <Container x={x} y={y}>
      <Sprite
        spritesheet={spritesheetUrl}
        width={width}
        height={
          innerPadding.up +
          (itemHeight + BETWEEN_ITEMS_PAD) * ((children?.length || 0) + 1) +
          innerPadding.down
        }
        y={0}
        x={x + width / 2}
        textureUrl={menuName}
        pixelised
      />
      <Text
        x={x + width}
        y={innerPadding.up}
        anchor={{ x: 0.5, y: 0 }}
        text="Пауза"
        style={PIXEL_FONT}
      />
      {children?.map(({ text, onClick }, index) => (
        <ButtonWithText
          key={index}
          marginLeft={40}
          marginTop={10}
          x={innerPadding.left + width / 2}
          y={innerPadding.up + (itemHeight + BETWEEN_ITEMS_PAD) * (index + 1)}
          width={itemWidth}
          height={itemHeight}
          spritesheetUrl={spritesheetUrl}
          textureUrl={menuButtonName}
          fontStyle={PIXEL_FONT}
          onClick={onClick}
        >
          {text}
        </ButtonWithText>
      ))}
    </Container>
  );
};
