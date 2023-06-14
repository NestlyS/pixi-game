import { memo, useCallback } from 'react';
import { Body as Matter_Body } from 'matter-js';
import {
  CRACK_BOTTOM_LEFT,
  CRACK_BOTTOM_MIDDLE,
  CRACK_BOTTOM_RIGHT,
  DIRT_MIDDLE_PART_NAME,
  MIDDLE_PART_NAME,
} from '../../../TileGround/components/Grass/contants';
import { Grass } from '../../../TileGround/components/Grass/Grass';
import { TrashRow } from '../../../trashes/TrashRow';
import { ChunkProps } from '../../typings';
import { isUserLabel } from '../../../controllers/ConntectedSensorController/utils';
import { useTutorialContext } from '../../../../pages/game/components/TutorialStartPlatform/context';
import { Container } from '@pixi/react';
import { DamagingStaticBody } from '../../../DamagingStaticBody';
import { TableSprite } from '../../../TableSprite';
import { applyForce } from '../../../Body/utils';

export const CRACK_ROW_WIDTH = 10;
const HIT_FORCE_STRENGTH = 7;
const CRACK_WIDTH = 5;
const CRACK_INSIDE_WALLS_TILE_COUNT = 2;
const CRACK_LABEL = 'crack-danger';
export const isCrackBody = (body: Matter_Body) => body.label.includes(CRACK_LABEL);
const TABLE_SCALE = { x: -1, y: 1 };

export const Crack = memo(
  ({
    spritesheetUrl,
    x,
    y,
    tileSize,
    tilesHeight,
    width = CRACK_ROW_WIDTH,
    zIndex,
  }: ChunkProps) => {
    const isTutorial = useTutorialContext();

    const crackWidth = Math.ceil((width - CRACK_WIDTH) / 2);
    const rightCrackWidth = crackWidth + CRACK_INSIDE_WALLS_TILE_COUNT;
    const firstCrackCenter = x + (crackWidth * tileSize) / 2;
    const secondCrackCenter =
      firstCrackCenter +
      CRACK_WIDTH * tileSize +
      (rightCrackWidth - CRACK_INSIDE_WALLS_TILE_COUNT - 1) * tileSize;
    const textureModifierLeft = useCallback(
      (indexX: number, indexY: number, length: number, height: number) => {
        if (indexY === 0 && indexX === 0) {
          return MIDDLE_PART_NAME;
        }

        if (indexY > 0 && indexX === 0) {
          return DIRT_MIDDLE_PART_NAME;
        }

        if (indexY === height - 1 && indexX === length - 1) {
          return DIRT_MIDDLE_PART_NAME;
        }

        return null;
      },
      [],
    );

    const textureModifierRight = useCallback(
      (indexX: number, indexY: number, length: number, height: number) => {
        if (indexY === 0 && indexX === length - 1) {
          return MIDDLE_PART_NAME;
        }

        if (indexY > 0 && indexX === length - 1) {
          return DIRT_MIDDLE_PART_NAME;
        }

        if (indexY === height - 1 && indexX === 0) {
          return DIRT_MIDDLE_PART_NAME;
        }

        return null;
      },
      [],
    );

    const textureModifierCrack = useCallback((indexX: number, indexY: number, length: number) => {
      if (indexY === 0 && indexX === 0) {
        return CRACK_BOTTOM_LEFT;
      }

      if (indexY === 0 && indexX < length - 1) {
        return CRACK_BOTTOM_MIDDLE;
      }

      if (indexY === 0 && indexX === length - 1) {
        return CRACK_BOTTOM_RIGHT;
      }

      if (indexY > 0) {
        return DIRT_MIDDLE_PART_NAME;
      }

      return null;
    }, []);

    const onCollision = useCallback((e: Matter.IEventCollision<Matter.Engine>) => {
      const userCollided = e.pairs.find(
        (item) => isUserLabel(item.bodyA) || isUserLabel(item.bodyB),
      );

      if (!userCollided) return null;

      const userBody = isUserLabel(userCollided.bodyA) ? userCollided.bodyA : userCollided.bodyB;

      applyForce(userBody, 0, -HIT_FORCE_STRENGTH * 1.5);
      setTimeout(() => applyForce(userBody, HIT_FORCE_STRENGTH, -HIT_FORCE_STRENGTH), 100);
    }, []);

    return (
      <Container zIndex={zIndex}>
        <TrashRow
          x={x + crackWidth * tileSize + tileSize / 2}
          y={y - (tilesHeight * tileSize) / 2 - tileSize * 2}
          tileSize={tileSize}
          width={CRACK_WIDTH - CRACK_INSIDE_WALLS_TILE_COUNT}
          type={'random'}
          isUncollectable={isTutorial}
        />

        <Grass
          textureModifier={textureModifierLeft}
          spritesheetUrl={spritesheetUrl}
          x={firstCrackCenter}
          y={y}
          tileSize={tileSize}
          tilesWidth={crackWidth}
          tilesHeight={tilesHeight}
          isSingleGrass
        />

        <Grass
          textureModifier={textureModifierRight}
          spritesheetUrl={spritesheetUrl}
          x={secondCrackCenter}
          y={y}
          tileSize={tileSize}
          tilesWidth={rightCrackWidth}
          tilesHeight={tilesHeight}
          isSingleGrass
        />

        <Grass
          textureModifier={textureModifierCrack}
          withDeco={false}
          spritesheetUrl={spritesheetUrl}
          x={firstCrackCenter + crackWidth * tileSize}
          y={y + ((tilesHeight - 0.5) * tileSize) / 2}
          tileSize={tileSize}
          tilesWidth={CRACK_WIDTH}
          tilesHeight={2}
          isSingleGrass
        />

        <TableSprite
          x={x + tileSize * 1}
          y={y - tilesHeight * tileSize * 0.5 - tileSize * 0.9}
          width={tileSize}
          height={tileSize}
          tableDirection="up"
          rotation={-0.2}
        />

        <DamagingStaticBody
          x={x + (width * tileSize) / 2}
          y={y + ((tilesHeight - 1.5) * tileSize) / 2}
          width={width * tileSize}
          height={tileSize}
          onCollision={onCollision}
          label={CRACK_LABEL}
        />
      </Container>
    );
  },
);
