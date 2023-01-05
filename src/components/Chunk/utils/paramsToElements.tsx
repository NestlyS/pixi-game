import { Body } from "../../Body";
import { GRASS_TO_DIRT_NAME, DIRT_TO_GRASS_NAME, MIDDLE_PART_NAME, DIRT_MIDDLE_PART_NAME, Grass } from "../../TileGround/Grass";
import { TRAMPLIN_OPTIONS } from "../contants";
import { LandscapeParamsType, ModifiedGrassProps } from "../typings";

export const paramsToElements = (params: LandscapeParamsType[], props: ModifiedGrassProps): (React.ReactElement | null)[][] =>
  params.map((item, index, arr) => {
    const key = index;
    const isPrevLower = index === 0 ? false : arr[index - 1].y > item.y;
    const isNextLower = index === arr.length - 1 ? false : arr[index + 1].y > item.y;
    const body = isPrevLower ?
      <Body
        key={`body-${key}`}
        x={item.x - item.width / 2 - props.tileSize / 2.1}
        y={item.y - (props.tilesHeight * props.tileSize) / 1.9 + props.tileSize}
        rotation={-0.7}
        width={props.tileSize * 2}
        height={props.tileSize}
        options={TRAMPLIN_OPTIONS}
      />
      : null;

    const textureModifier = (indexX: number, indexY: number, length: number) => {
      if (isPrevLower && indexY === 1 && indexX === 0) {
        return GRASS_TO_DIRT_NAME;
      }

      if (isNextLower && indexY === 1 && indexX === length - 1) {
        return DIRT_TO_GRASS_NAME;
      }

      if ((!isPrevLower && indexY === 0 && indexX === 0) || (!isNextLower && indexY === 0 && indexX === length - 1)) {
        return MIDDLE_PART_NAME;
      }

      if (indexY > 0 && (indexX === 0 || indexX === length)) {
        return DIRT_MIDDLE_PART_NAME;
      }

      return null;
    }

    console.log(item.y, arr[index - 1]?.y, isPrevLower, body);
    return ([
      <Grass {...props} key={key} x={item.x} y={item.y} tilesWidth={item.width / props.tileSize} textureModifier={textureModifier} />,
      body
    ]);
  })
