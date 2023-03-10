import { memo } from 'react';
import { Sprite as PIXI_Sprite } from 'pixi.js';
import { _ReactPixi } from '@inlet/react-pixi';
import { useBodyParams } from '../../Body/context';
import { ContainerContextProvider, useMakeContainer } from '../ViewController/context';
import { ISpriteProps, Sprite } from '../../Sprite';

type Props = {
  children?: React.ReactElement | React.ReactElement[];
};

export const SpriteController = memo(({ children, ...props }: ISpriteProps & Props) => {
  const { x, y, rotation } = useBodyParams();

  const pivot = props.width && props.height ? { x: 0.5, y: 0.5 } : undefined;

  const { ref, value } = useMakeContainer<PIXI_Sprite>();

  return (
    <>
      <Sprite x={x} y={y} ref={ref} rotation={rotation} anchor={pivot} {...props} />
      {children && <ContainerContextProvider value={value}>{children}</ContainerContextProvider>}
    </>
  );
});
