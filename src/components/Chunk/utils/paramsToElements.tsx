import { Body } from '../../Body';
import { Sprite } from '../../Sprite';
import {
  GRASS_TO_DIRT_NAME,
  DIRT_TO_GRASS_NAME,
  MIDDLE_PART_NAME,
  DIRT_MIDDLE_PART_NAME,
  GRASS_SMOOTH_UP_TRANSITION,
} from '../../TileGround/components/Grass/contants';
import { Grass } from '../../TileGround/components/Grass/Grass';
import { TRAMPLIN_OPTIONS } from '../contants';
import { LandscapeParamsType } from '../typings';

type ParamsToElements = (props: {
  params: LandscapeParamsType[];
  tileSize: number;
  tilesHeight: number;
  spritesheetUrl: string;
}) => (React.ReactElement | null)[][];

export const paramsToElements: ParamsToElements = ({
  params,
  tileSize,
  tilesHeight,
  spritesheetUrl,
}) =>
  params.map((item, index, arr) => {
    const key = index;
    const isPrevLower = index === 0 ? false : arr[index - 1].y > item.y;
    const isNextLower = index === arr.length - 1 ? false : arr[index + 1].y > item.y;
    const body = isPrevLower ? (
      <Body
        key={`body-${key}`}
        x={item.x - tileSize / 3}
        y={item.y - (tilesHeight * tileSize) / 1.9 + tileSize}
        rotation={-0.6}
        width={tileSize * 2}
        height={tileSize}
        options={TRAMPLIN_OPTIONS}
      />
    ) : null;
    const sprite = isPrevLower ? (
      <Sprite
        key={`sprite-${key}`}
        x={item.x - tileSize / 1.3}
        y={item.y - (tilesHeight * tileSize) / 2}
        width={tileSize}
        height={tileSize}
        pixelised
        textureUrl={GRASS_SMOOTH_UP_TRANSITION}
        spritesheet={spritesheetUrl}
      />
    ) : null;

    const textureModifier = (indexX: number, indexY: number, length: number) => {
      if (isPrevLower && indexY === 1 && indexX === 0) {
        return GRASS_TO_DIRT_NAME;
      }

      if (isNextLower && indexY === 1 && indexX === length - 1) {
        return DIRT_TO_GRASS_NAME;
      }

      if (
        (!isPrevLower && indexY === 0 && indexX === 0) ||
        (!isNextLower && indexY === 0 && indexX === length - 1)
      ) {
        return MIDDLE_PART_NAME;
      }

      if (indexY > 0 && (indexX === 0 || indexX === length)) {
        return DIRT_MIDDLE_PART_NAME;
      }

      return null;
    };

    console.log(item.y, arr[index - 1]?.y, isPrevLower, body);
    return [
      <Grass
        key={key}
        x={item.x + item.width / 2}
        y={item.y}
        tilesWidth={item.width / tileSize}
        textureModifier={textureModifier}
        spritesheetUrl={spritesheetUrl}
        tileSize={tileSize}
        tilesHeight={tilesHeight}
      />,
      body,
      sprite,
    ];
  });
