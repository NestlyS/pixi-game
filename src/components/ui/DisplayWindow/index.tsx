import { Text, Container, Graphics } from '@pixi/react';
import { Graphics as PIXI_Graphics } from 'pixi.js';
import { COLORS } from '../../../constants';
import { Sprite } from '../../Sprite';
import { useFont } from '../../../utils/useFont';
import { Children, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  selectAppControllerHeight,
  selectAppControllerWidth,
} from '../../../redux/appController/selectors';
import { PositionContextProvider } from './context';
import React from 'react';

const BETWEEN_ITEMS_PAD = 20;

const DEFAULT_PADDING = { left: 0, down: 0, right: 0, up: 0 };

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  spritesheetUrl: string;
  menuName: string;
  padding?: { left?: number; down?: number; right?: number; up?: number };
  itemHeight?: number;
  children?: React.ReactNode;
  onExit?: () => void;
};

type WrapperProps = {
  x: number;
  y: number;
  height: number;
  width: number;
  children?: React.ReactNode;
};

export const ElementWrapper = React.memo(({ x, y, height, width, children }: WrapperProps) => (
  <PositionContextProvider value={{ x, y, height, width }}>{children}</PositionContextProvider>
));

export const DisplayWindow = ({
  x,
  y,
  width,
  menuName,
  spritesheetUrl,
  padding = DEFAULT_PADDING,
  itemHeight = 80,
  children,
  onExit,
}: Props) => {
  const screenWidth = useSelector(selectAppControllerWidth);
  const screenHeight = useSelector(selectAppControllerHeight);
  const innerPadding = { ...DEFAULT_PADDING, ...padding };

  const headFontStyle = useFont({
    fill: [COLORS.MainFontFill],
    stroke: COLORS.MainFontOutline,
    fontSize: itemHeight * 0.8,
    strokeThickness: itemHeight * 0.2,
    lineHeight: itemHeight * 0.8,
  });

  const backgroundDraw = useCallback(
    (draw: PIXI_Graphics) =>
      draw.clear().beginFill(COLORS.Black, 0.3).drawRect(0, 0, screenWidth, screenHeight).endFill(),
    [screenWidth, screenHeight],
  );

  return (
    <>
      <Graphics draw={backgroundDraw} interactive={true} pointertap={onExit} />
      <Container x={x} y={y}>
        <Sprite
          spritesheet={spritesheetUrl}
          width={width}
          height={
            innerPadding.up +
            (itemHeight + BETWEEN_ITEMS_PAD) * ((Children.count(children) || 0) + 1) +
            innerPadding.down
          }
          y={0}
          x={0}
          interactive
          textureUrl={menuName}
          pixelised
        />
        <Text
          x={width * 0.51}
          y={innerPadding.up}
          anchor={{ x: 0.5, y: 0 }}
          text="Пауза"
          style={headFontStyle}
        />
        {Children.map(children, (el, index) => (
          <ElementWrapper
            x={innerPadding.left}
            y={innerPadding.up + (itemHeight + BETWEEN_ITEMS_PAD) * (index + 1)}
            height={itemHeight}
            width={width - innerPadding.right * 1.8}
          >
            {el}
          </ElementWrapper>
        ))}
      </Container>
    </>
  );
};
