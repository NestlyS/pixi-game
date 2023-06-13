import React, { Children } from 'react';
import { Container } from '@pixi/react';
import { usePositionContext } from '../../../../../../../../../../components/ui/DisplayWindow/context';

type Props = {
  children: React.ReactNode;
  childrenWidth: number;
};

export const ButtonRow = ({ children, childrenWidth }: Props) => {
  const { x, y, height, width } = usePositionContext();

  return (
    <Container x={x} y={y} height={height} width={width}>
      {Children.map(children, (child, index) => (
        <Container x={childrenWidth * index} y={0}>
          {child}
        </Container>
      ))}
    </Container>
  );
};
