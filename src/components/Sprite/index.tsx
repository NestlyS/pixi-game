import React, { forwardRef, memo, useEffect, useState } from 'react';
import { SCALE_MODES } from '@pixi/constants';
import { Rectangle } from '@pixi/math';
import { PixiRef, Sprite as ReactPixiSprite, useApp, _ReactPixi } from '@pixi/react';
import { Assets, Resource, Texture, TextureSource } from 'pixi.js';

export type ISpriteProps = {
  frame?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  pixelised?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  onHoverOut?: () => void;
  onHoverOutOutside?: () => void;
} & (
  | {
      textureUrl: string;
      spritesheet: string;
      image: string;
    }
  | {
      textureUrl: string;
      spritesheet?: string;
      image?: string;
    }
) &
  _ReactPixi.ISprite;

export const Sprite = memo(
  forwardRef<PixiRef<typeof ReactPixiSprite>, ISpriteProps>(
    (
      {
        image,
        textureUrl,
        spritesheet,
        frame,
        pixelised = true,
        onClick = undefined,
        onHover = undefined,
        onHoverOut = undefined,
        ...props
      }: ISpriteProps,
      ref,
    ) => {
      const [texture, setTexture] = useState<Texture | undefined>(undefined);
      const app = useApp();

      useEffect(() => {
        const controller = new AbortController();
        const textureSource: TextureSource = textureUrl;

        if (Assets.cache.has(textureUrl)) {
          const _texture = Assets.cache.get<Texture<Resource>>(textureUrl);
          if (pixelised) _texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

          return setTexture(_texture);
        }

        const cb = async () => {
          if (controller.signal.aborted) return;

          console.log(
            'TEXTURE URL',
            textureUrl,
            Assets.cache.has(textureUrl),
            spritesheet && Assets.cache.has(spritesheet),
          );
          // Дополнительная проверка так как загрузка спрайта происходит асинхронно и все может поменяться
          const _texture = Assets.cache.has(textureUrl)
            ? Assets.cache.get<Texture<Resource>>(textureUrl)
            : Texture.from(textureSource, {
                scaleMode: pixelised ? SCALE_MODES.NEAREST : SCALE_MODES.LINEAR,
              });

          if (frame) {
            _texture.frame = new Rectangle(frame.x, frame.y, frame.width, frame.height);
          }

          if (controller.signal.aborted) return;

          setTexture(_texture);
        };

        cb();
        return () => controller?.abort();
      }, [app, frame, pixelised, spritesheet, textureUrl]);

      if (!texture && !image) {
        return null;
      }

      return (
        <ReactPixiSprite
          interactive={!!onClick}
          pointertap={onClick}
          pointerdown={onHover}
          pointerup={onHoverOut}
          ref={ref}
          texture={texture}
          image={image}
          {...props}
        />
      );
    },
  ),
);
