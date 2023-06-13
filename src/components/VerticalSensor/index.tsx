import { useCallback } from 'react';
import { Body } from '../Body';
import { isAnyPairInUserBodyGroup } from '../../bodyGroups/user';

const SENSOR_LABEL = 'sensor';

const SENSOR_OPTIONS: Matter.IChamferableBodyDefinition = {
  isSensor: true,
  isStatic: true,
};

type Props = {
  x: number;
  y: number;
  onCollision: (e: Matter.IEventCollision<Matter.Engine>) => void;
  isUserCollisionOnly?: boolean;
};

export const VerticalSensor = ({ x, y, onCollision, isUserCollisionOnly }: Props) => {
  const innerOnCollision = useCallback(
    (e: Matter.IEventCollision<Matter.Engine>) => {
      if (isUserCollisionOnly && !isAnyPairInUserBodyGroup(e.pairs)) return;
      onCollision(e);
    },
    [isUserCollisionOnly, onCollision],
  );

  return (
    <Body
      x={x}
      y={y}
      width={200}
      height={10000}
      options={SENSOR_OPTIONS}
      label={SENSOR_LABEL}
      onCollision={innerOnCollision}
    />
  );
};
