import { useSelector } from 'react-redux';
import {
  selectAppControllerHeight,
  selectAppControllerWidth,
} from '../../../../redux/appController/selectors';
import { Container } from '@pixi/react';
import { Sprite } from '../../../../components/Sprite';
import { LeftBackgroundPart } from './components/LeftBackgroundPart';
import { RightBackgroundPart } from './components/RightBackgroundPart';
import { START_SCREEN_SPRITESHEET_URL } from '../../../../constants';
import React from 'react';

// Ужасный костыль, но это пока лучшее решение :с
const PIC_HEIGHT = 2745;

const MIDDLE_PIC_WIDTH = 1596;

const ANCHOR = { x: 0.5, y: 0 };

const MIDDLE_BACKGROUND_TEXTURE_URL = 'pattern_middle.png';

export const Background = React.memo(() => {
  const screenWidth = useSelector(selectAppControllerWidth);
  const screenHeight = useSelector(selectAppControllerHeight);

  const centerX = screenWidth / 2;
  const scale = screenHeight / PIC_HEIGHT;

  return (
    <Container>
      <LeftBackgroundPart scale={scale} startX={centerX - MIDDLE_PIC_WIDTH * scale * 0.5} />
      <RightBackgroundPart scale={scale} startX={centerX + MIDDLE_PIC_WIDTH * scale * 0.5} />
      <Sprite
        x={centerX}
        y={0}
        scale={scale}
        anchor={ANCHOR}
        pixelised={false}
        textureUrl={MIDDLE_BACKGROUND_TEXTURE_URL}
        spritesheet={START_SCREEN_SPRITESHEET_URL}
      />
    </Container>
  );
});
