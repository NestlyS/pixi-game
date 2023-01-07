import { useCallback, useMemo } from "react";
import { Props, spritesheetUrl, TileGround } from "../..";
import { Row } from "../../Row";
import { generateDecorationGenerator, getMainTexture } from "./utils";

export const Grass = ({textureModifier, ...props}: Omit<Props, 'getTexture'> & { textureModifier?: (indexX: number, indexY: number, length: number, height: number) => string | null }) => {
  const getTexture = useCallback((indexX: number, indexY: number, length: number, height: number) => getMainTexture(textureModifier)(indexX, indexY, length, height), [textureModifier]);
  const getDecorationTexture = useMemo(() => generateDecorationGenerator(), []);
  const getGrassTexture = useCallback((indexX: number) => getDecorationTexture(props.tilesWidth, props.tilesHeight)(indexX), [getDecorationTexture, props.tilesHeight, props.tilesWidth]);

  return  <>
            <TileGround {...props} getTexture={getTexture} />
            <Row startX={props.x - props.tilesWidth * props.tileSize / 2 + props.tileSize / 2} startY={props.y - props.tilesHeight * props.tileSize / 2 - props.tileSize / 2} tilesCount={props.tilesWidth} tileSize={props.tileSize} spritesheet={spritesheetUrl} getTexture={getGrassTexture} />
          </>;
}

export type GrassProps = Omit<Props, 'getTexture'>;