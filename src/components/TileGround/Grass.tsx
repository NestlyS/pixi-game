import { TilingSprite, useApp } from "@inlet/react-pixi";
import { SCALE_MODES, Texture, TextureSource } from "pixi.js";
import { useCallback, useEffect, useState } from "react";
import { Props, TileGround } from ".";
import { loadData } from "../../utils/asyncPIXILoader";

export const LEFT_EDGE_NAME = 'grass-up-start.png';
export const MIDDLE_PART_NAME = 'grass-up-middle.png';
export const RIGHT_EDGE_NAME = 'grass-up-end.png';
export const DIRT_LEFT_EDGE_NAME = 'dirt-start.png';
export const DIRT_MIDDLE_PART_NAME = 'dirt-middle-1.png';
export const DIRT_RIGHT_EDGE_NAME = 'dirt-end.png';
export const DIRT_TO_GRASS_NAME = 'grass-bottom-dirt-to-grass.png';
export const GRASS_TO_DIRT_NAME = 'grass-bottom-grass-to-dirt.png';

export const Grass = ({textureModifier, ...props}: Omit<Props, 'getTexture'> & { textureModifier?: (indexX: number, indexY: number, length: number, height: number) => string | null }) => {
  const getTexture = useCallback((indexX: number, indexY: number, length:number, height: number) => {
    const modifiedTexture = textureModifier?.(indexX, indexY, length, height);

    if (modifiedTexture) return modifiedTexture;

    if (indexY === 0) {
      if (indexX === 0) {
        return LEFT_EDGE_NAME;
      }

      if (indexX < length) {
        return MIDDLE_PART_NAME;
      }

      return RIGHT_EDGE_NAME;
    }

    if (indexX === 0) {
      return DIRT_LEFT_EDGE_NAME;
    }

    if (indexX < length) {
      return DIRT_MIDDLE_PART_NAME;
    }

    return DIRT_RIGHT_EDGE_NAME
  }, [textureModifier]);

  const [dirtTexture, setTexture] = useState<Texture | undefined>(undefined);
  const app = useApp();

  useEffect(() => {
    const cb = async () => {
      const textureSource = await loadData<TextureSource>(DIRT_MIDDLE_PART_NAME, app);

      const texture = Texture.from(textureSource);

      texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

      setTexture(texture);
    }

    cb();
  }, [app]);

  console.log(dirtTexture);

  return <TileGround {...props} getTexture={getTexture} />;
}

export type GrassProps = Omit<Props, 'getTexture'>;