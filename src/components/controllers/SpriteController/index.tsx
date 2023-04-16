import { memo } from 'react';
import { Sprite as PIXI_Sprite } from '@pixi/sprite';
import { useBodyParams } from '../../Body/context';
import { ContainerContextProvider, useMakeContainer } from '../ViewController/context';
import { ISpriteProps, Sprite } from '../../Sprite';

type Props = {
  children?: React.ReactNode | boolean;
};

export const SpriteController = memo(({ children, ...props }: ISpriteProps & Props) => {
  const { x, y, rotation } = useBodyParams();

  const pivot = props.width && props.height && !props.pivot ? { x: 0.5, y: 0.5 } : props.pivot;

  const { ref, value } = useMakeContainer<PIXI_Sprite>();

  return (
    <>
      <Sprite x={x} y={y} ref={ref} rotation={rotation} anchor={pivot} {...props} />
      {children && <ContainerContextProvider value={value}>{children}</ContainerContextProvider>}
    </>
  );
});
