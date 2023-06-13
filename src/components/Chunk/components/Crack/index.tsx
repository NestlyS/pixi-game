import React, { memo, useCallback } from 'react';
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
import { Body } from '../../../Body';
import { DAMAGING_BODY_GROUP } from '../../../../bodyGroups/damaging';
import { isUserLabel } from '../../../controllers/ConntectedSensorController/utils';
import { useTutorialContext } from '../../../../pages/game/components/TutorialStartPlatform/context';
import { Container } from '@pixi/react';
import { DamagingStaticBody } from '../../../DamagingStaticBody';

export const CRACK_ROW_WIDTH = 8;
const CRACK_WIDTH = 3;

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
    const firstCrackCenter = x + (crackWidth * tileSize) / 2;
    const secondCrackCenter =
      firstCrackCenter +
      (crackWidth * tileSize) / 2 +
      (crackWidth * tileSize) / 2 +
      CRACK_WIDTH * tileSize;
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

    const onCollision = useCallback(
      (e: Matter.IEventCollision<Matter.Engine>) => {
        const userCollided = e.pairs.find(
          (item) => isUserLabel(item.bodyA) || isUserLabel(item.bodyB),
        );

        if (!userCollided) return null;

        const userBody = isUserLabel(userCollided.bodyA) ? userCollided.bodyA : userCollided.bodyB;

        Matter_Body.setPosition(userBody, {
          x: secondCrackCenter,
          y: y - (tilesHeight * tileSize) / 2,
        });
      },
      [secondCrackCenter, tileSize, tilesHeight, y],
    );

    return (
      <Container zIndex={zIndex}>
        <TrashRow
          x={x + crackWidth * tileSize + tileSize / 2}
          y={y - (tilesHeight * tileSize) / 2 - tileSize * 2}
          tileSize={tileSize}
          width={CRACK_WIDTH}
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
          tilesWidth={crackWidth}
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
          tilesWidth={CRACK_WIDTH + 2}
          tilesHeight={2}
          isSingleGrass
        />

        <DamagingStaticBody
          x={x + (width * tileSize) / 2}
          y={y + ((tilesHeight - 1.5) * tileSize) / 2}
          width={width * tileSize}
          height={tileSize}
          onCollision={onCollision}
        />
      </Container>
    );
  },
);
