import React, { memo, ReactNode } from 'react';
import { Body } from '../Body';
import { GROUND_BODY_GROUP, GROUND_LABEL } from '../../bodyGroups/ground';

const GROUND_OPTIONS = { isStatic: true };

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  children?: React.ReactElement | React.ReactElement[] | ReactNode;
  rotation?: number;
}

export const Ground = memo(({ x, y, width, height, children, rotation}: Props) => (
  <Body x={x} y={y} width={width} rotation={rotation} height={height} options={GROUND_OPTIONS} label={GROUND_LABEL} bodyGroup={GROUND_BODY_GROUP}>
    {children}
  </Body>
));