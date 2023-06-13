import { useCallback } from 'react';
import { Props, TileGround } from '../..';
import { GrassDeco } from '../GrassDeco';
import { getMainTexture } from './utils';

export type GrassProps = {
  textureModifier?: (
    indexX: number,
    indexY: number,
    length: number,
    height: number,
  ) => string | null;
  isSingleGrass?: boolean;
  withDeco?: boolean;
  spritesheetUrl: string;
} & Omit<Props, 'getTexture'>;

export const Grass = ({
  textureModifier,
  isSingleGrass = false,
  withDeco = true,
  ...props
}: GrassProps) => {
  const getTexture = useCallback(
    (indexX: number, indexY: number, length: number, height: number) =>
      getMainTexture(textureModifier)(indexX, indexY, length, height, isSingleGrass),
    [isSingleGrass, textureModifier],
  );

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
      {withDeco && (
        <GrassDeco
          x={props.x + props.tileSize - (props.tilesWidth * props.tileSize) / 2}
          y={props.y - (props.tilesHeight * props.tileSize) / 2}
          width={props.tilesWidth * props.tileSize}
          step={props.tileSize}
          spritesheetUrl={props.spritesheetUrl}
        />
      )}
    </>
  );
};
