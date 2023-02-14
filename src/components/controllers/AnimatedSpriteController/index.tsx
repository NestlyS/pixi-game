import { memo, useMemo, useState } from 'react';
import { AnimatedSprite as PIXI_AnimatedSprite, Container as PIXI_Container } from 'pixi.js';
import { useBody, useBodyParams } from '../../Body/context';
import { AnimatedSprite, IAnimatedSprite } from '../../AnimatedSprite';
import { ContainerContextProvider, useMakeContainer } from '../ViewController/context';
import { useTick } from '@inlet/react-pixi';
import { EPS } from '../../../constants';

type Props = {
  children?: React.ReactElement | React.ReactElement[];
  ignoreRotation?: boolean;
} & Omit<Omit<Omit<IAnimatedSprite, 'x'>, 'y'>, 'rotation'>;

export const AnimatedSpriteController = memo(({ children, ignoreRotation, ...props }: Props) => {
  const { x, y, rotation } = useBodyParams();

  const { body } = useBody();

  const pivot = props.width && props.height ? { x: 0.5, y: 0.55 } : undefined;
  const [scaleX, setScaleX] = useState<1 | -1>(1);

  useTick(() => {
    if (!body) {
      return;
    }

    if (scaleX !== 1 && body.velocity.x > EPS * 10) {
      setScaleX(1);
    }

    if (scaleX !== -1 && body.velocity.x < -EPS * 10) {
      setScaleX(-1);
    }
  });

  const { ref, value } = useMakeContainer<PIXI_Container<PIXI_AnimatedSprite>>();

  const scaleObj = useMemo(() => {
    const currentScale = ref.current?.children?.[0]?.scale;

    if (!currentScale) {
      return;
    }

    return {
      x: Math.abs(currentScale.x) * scaleX,
      y: currentScale.y,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current?.children?.[0]?.scale.x, scaleX]);

  return (
    <AnimatedSprite
      ref={ref}
      x={x}
      y={y}
      rotation={ignoreRotation ? 0 : rotation}
      scale={scaleObj}
      anchor={pivot}
      {...props}
    >
      <ContainerContextProvider value={value}>{children}</ContainerContextProvider>
    </AnimatedSprite>
  );
});
