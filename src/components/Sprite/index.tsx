import { Sprite as ReactPixiSprite, useApp, _ReactPixi } from '@inlet/react-pixi';
import { ISpritesheetData, Rectangle, SCALE_MODES, Sprite as PIXI_Sprite, Texture, TextureSource } from 'pixi.js'
import React, { forwardRef, useEffect, useState } from 'react'
import { loadData } from '../../utils/asyncPIXILoader';

export type ISpriteProps = {
  frame?: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
  pixelised?: boolean,
} & ({
  textureUrl?: string;
  spritesheet?: string;
  image: string;
} | {
  textureUrl: string;
  spritesheet?: string;
  image?: string;
}) & _ReactPixi.ISprite

export const Sprite = forwardRef<PIXI_Sprite, ISpriteProps>(({
  image,
  textureUrl,
  spritesheet,
  frame,
  pixelised,
  ...props
}: ISpriteProps, ref) => {
  const [texture, setTexture] = useState<Texture | undefined>(undefined);
  const app = useApp();

  useEffect(() => {
    const cb = async () => {
      let textureSource: TextureSource | null = null;

      if (spritesheet && textureUrl) {
        await loadData<ISpritesheetData>(spritesheet, app);
        textureSource = textureUrl;
      }

      if (!spritesheet && textureUrl) {
        textureSource = await loadData<TextureSource>(textureUrl, app);
      }

      if (!textureSource) {
        return;
      }

      const _texture = Texture.from(textureSource);

      if (frame) {
        _texture.frame = new Rectangle(frame.x, frame.y, frame.width, frame.height);
      }

      if (pixelised) {
        _texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
      }

      setTexture(_texture);
    }

    cb();
  }, [app, frame, pixelised, spritesheet, textureUrl]);

  if (!texture && !image) {
    return null;
  }

  return (
    <ReactPixiSprite ref={ref} texture={texture} image={image} {...props} />
  )
});