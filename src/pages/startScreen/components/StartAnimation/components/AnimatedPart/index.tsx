import { ease } from 'pixi-ease';
import React, { useRef, useEffect, useState } from 'react';
import { Sprite as ReactPixiSprite } from 'pixi.js';

import { Sprite } from '../../../../../../components/Sprite';
import { START_SCREEN_SPRITESHEET_URL } from '../../../../../../constants';
import { useMounted } from '../../../../../../utils/useMounted';

const DEFAULT_ANCHOR = { x: 0, y: 0 };

type Props = {
  x: number;
  y: number;
  scale: number;
  animateToX?: number;
  animateToY?: number;
  rotateTo?: number;
  scaleTo?: number;
  textureUrl: string;
  anchor?: { x: number; y: number };
  duration: number;
  onComplete?: () => void;
};

export const AnimatedPart = React.memo(
  ({
    x,
    y,
    scale,
    animateToX,
    animateToY,
    rotateTo,
    scaleTo,
    textureUrl,
    anchor = DEFAULT_ANCHOR,
    duration,
    onComplete,
  }: Props) => {
    const isMounted = useMounted();
    const ref = useRef<ReactPixiSprite | null>(null);
    const [_x, setX] = useState(x);
    const [_y, setY] = useState(y);

    useEffect(() => {
      if (!ref.current || !isMounted) return;

      const animationData = {} as { x: number; y: number; scale: number; rotation: number };
      if (animateToX) animationData.x = animateToX;
      if (animateToY) animationData.y = animateToY;
      if (rotateTo) animationData.rotation = rotateTo;
      if (scaleTo) animationData.scale = scaleTo;

      const generic = ease.add(ref.current, animationData, { duration, ease: 'easeInQuad' });
      generic.once('complete', () => {
        onComplete?.();
        setX(ref.current?.x || 0);
        setY(ref.current?.y || 0);
      });
    }, [isMounted, animateToX, duration, onComplete, animateToY, rotateTo, scaleTo]);

    return (
      <Sprite
        x={_x}
        y={_y}
        anchor={anchor}
        scale={scale}
        pixelised={false}
        textureUrl={textureUrl}
        spritesheet={START_SCREEN_SPRITESHEET_URL}
        ref={ref}
      />
    );
  },
);
