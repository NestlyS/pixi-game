import React, { memo, useCallback } from 'react';
import { Body as Matter_Body } from 'matter-js';
import {
  DIRT_MIDDLE_PART_NAME,
  MIDDLE_PART_NAME,
} from '../../../TileGround/components/Grass/contants';
import { Grass } from '../../../TileGround/components/Grass/Grass';
import { TrashRow } from '../../../trashes/TrashRow';
import { ChunkProps } from '../../typings';
import { Body } from '../../../Body';
import { DAMAGING_BODY_GROUP } from '../../../../bodyGroups/damaging';
import { isUserLabel } from '../../../controllers/ConntectedSensorController/utils';

const TRAMPLIN_CONFIG = {
  isStatic: true,
};
export const CRACK_ROW_WIDTH = 8;
const CRACK_WIDTH = 2;

export const Crack = memo(
  ({ spritesheetUrl, x, y, tileSize, tilesHeight, width = CRACK_ROW_WIDTH }: ChunkProps) => {
    const crackWidth = Math.ceil((width - CRACK_WIDTH) / 2);
    const firstCrackCenter = x + (crackWidth * tileSize) / 2;
    const secondCrackCenter =
      firstCrackCenter +
      (crackWidth * tileSize) / 2 +
      (crackWidth * tileSize) / 2 +
      CRACK_WIDTH * tileSize;
    const textureModifierLeft = useCallback((indexX: number, indexY: number) => {
      if (indexY === 0 && indexX === 0) {
        return MIDDLE_PART_NAME;
      }

      if (indexY > 0 && indexX === 0) {
        return DIRT_MIDDLE_PART_NAME;
      }

      return null;
    }, []);

    const textureModifierRight = useCallback((indexX: number, indexY: number, length: number) => {
      if (indexY === 0 && indexX === length - 1) {
        return MIDDLE_PART_NAME;
      }

      if (indexY > 0 && indexX === length - 1) {
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
      <>
        <TrashRow
          x={x + crackWidth * tileSize + tileSize / 2}
          y={y - (tilesHeight * tileSize) / 2 - tileSize * 2}
          tileSize={tileSize}
          width={CRACK_WIDTH}
          type={'random'}
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
        <Body
          x={x + (width * tileSize) / 2}
          y={y + (tilesHeight * tileSize) / 2}
          width={width * tileSize}
          height={tileSize}
          bodyGroup={[DAMAGING_BODY_GROUP]}
          onCollision={onCollision}
          options={TRAMPLIN_CONFIG}
        />
      </>
    );
  },
);
