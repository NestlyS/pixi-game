import { useCallback, useState } from 'react';
import { Filters } from '../../../constants';
import { Container } from '@pixi/react';
import { useLowGraphic } from '../../../utils/useLowGraphic';
import {
  BackgroundTypes,
  ButtonBackground,
  Props as BackgroundProps,
} from './components/ButtonBackground';

export type Props = {
  x: number;
  y: number;
  children?: React.ReactNode;
} & Omit<BackgroundProps, 'type'>;

export const Button = ({
  x,
  y,
  onClick,
  onHover,
  onHoverOut,
  onHoverOutOutside,
  children,
  ...props
}: Props) => {
  const [isHovered, setHover] = useState(false);

  const _onHover = useCallback(() => {
    console.log('HOVER');
    onHover?.();
    setHover(true);
  }, [onHover]);

  const _onHoverOut = useCallback(() => {
    onHoverOut?.();
    setHover(false);
  }, [onHoverOut]);

  const _onHoverOutOutside = useCallback(() => {
    onHoverOutOutside?.();
    setHover(false);
  }, [onHoverOutOutside]);

  const _filters = useLowGraphic(isHovered ? [Filters.COLOR_OVERLAY_FILTER_DARKER] : []);

  return (
    <Container x={x} y={y} filters={_filters}>
      <ButtonBackground
        type={props.textureUrl ? BackgroundTypes.Sprite : BackgroundTypes.Graphic}
        onHover={_onHover}
        onClick={onClick}
        onHoverOut={_onHoverOut}
        onHoverOutOutside={_onHoverOutOutside}
        {...props}
      />
      {children}
    </Container>
  );
};
