import { Sprite as ReactPixiSprite, useApp, _ReactPixi } from '@inlet/react-pixi';
import {
  ISpritesheetData,
  Rectangle,
  SCALE_MODES,
  Sprite as PIXI_Sprite,
  Texture,
  TextureSource,
} from 'pixi.js';
import React, { forwardRef, memo, useEffect, useState } from 'react';
import { loadData } from '../../utils/asyncPIXILoader';

export type ISpriteProps = {
  frame?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  pixelised?: boolean;
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
  forwardRef<PIXI_Sprite, ISpriteProps>(
    ({ image, textureUrl, spritesheet, frame, pixelised, ...props }: ISpriteProps, ref) => {
      const [texture, setTexture] = useState<Texture | undefined>(undefined);
      const app = useApp();

      useEffect(() => {
        let controller = new AbortController();
        const textureSource: TextureSource = textureUrl;
        const _texture = Texture.from(textureSource);

        if (_texture?.valid) {
          return setTexture(_texture);
        }

        const cb = async () => {
          if (textureUrl) {
            await loadData<ISpritesheetData>(spritesheet ?? textureUrl, app, {
              signal: controller.signal,
            });
          }

          if (controller.signal.aborted) return;

          const _texture = Texture.from(textureSource);

          console.log('SOURCE', textureSource, _texture);
          if (frame) {
            _texture.frame = new Rectangle(frame.x, frame.y, frame.width, frame.height);
          }

          if (pixelised) {
            _texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
          }

          if (spritesheet === './sprites/backround.json')
            console.log('BANANANANA --------------', spritesheet, controller.signal.aborted);

          if (controller.signal.aborted) return;

          setTexture(_texture);
        };

        cb();
        return () => controller?.abort();
      }, [app, frame, pixelised, spritesheet, textureUrl]);

      if (!texture && !image) {
        return null;
      }

      return <ReactPixiSprite ref={ref} texture={texture} image={image} {...props} />;
    },
  ),
);
