import { useCallback, useMemo } from 'react';
import { Props, TileGround } from '../..';
import { Row } from '../../Row';
import { GrassDeco } from '../GrassDeco';
import { getMainTexture } from './utils';

export type GrassProps = {
  textureModifier?: (
    indexX: number,
    indexY: number,
    length: number,
    height: number,
  ) => string | null;
  spritesheetUrl: string;
} & Omit<Props, 'getTexture'>;

export const Grass = ({ textureModifier, ...props }: GrassProps) => {
  const getTexture = useCallback(
    (indexX: number, indexY: number, length: number, height: number) =>
      getMainTexture(textureModifier)(indexX, indexY, length, height),
    [textureModifier],
  );
  // const getDecorationTexture = useMemo(() => generateDecorationGenerator(), []);
  // const getGrassTexture = useCallback((indexX: number) => getDecorationTexture(props.tilesWidth, props.tilesHeight)(indexX), [getDecorationTexture, props.tilesHeight, props.tilesWidth]);

  console.log(
    props.x,
    props.y,
    props.tileSize,
    props.tilesWidth,
    props.tileSize * props.tilesWidth,
    props.tileSize * props.tilesWidth + props.x,
  );

  return (
    <>
      <TileGround {...props} getTexture={getTexture} />
      <GrassDeco
        x={props.x + props.tileSize - (props.tilesWidth * props.tileSize) / 2}
        y={props.y - (props.tilesHeight * props.tileSize) / 2}
        width={props.tilesWidth * props.tileSize}
        step={props.tileSize}
        spritesheetUrl={props.spritesheetUrl}
      />
    </>
  );
};
