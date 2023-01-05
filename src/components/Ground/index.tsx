import React, { ReactNode, useCallback } from 'react';
import { Engine, IEventCollision } from 'matter-js';
import { Body } from '../Body';
import { throwEvent } from '../../utils/throwEvent';
import { RectangleController } from '../controllers/RectangleGraphicsController';

const GROUND_OPTIONS = { isStatic: true };
export const GROUND_COLLISION_EVENT_NAME = 'ground-collision';


type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  children?: React.ReactElement | React.ReactElement[] | ReactNode;
  rotation?: number;
}

export const Ground = ({ x, y, width, height, children, rotation}: Props) => {
  const onCollision = useCallback((e: IEventCollision<Engine>) => {
    throwEvent(GROUND_COLLISION_EVENT_NAME, e);
  }, []);

  return (
    <Body x={x} y={y} width={width} rotation={rotation} height={height} options={GROUND_OPTIONS} onCollision={onCollision}>
      {children}
    </Body>
  )
}
