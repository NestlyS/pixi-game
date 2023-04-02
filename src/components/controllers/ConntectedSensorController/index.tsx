import { useTick } from '@pixi/react';
import uniqueId from 'lodash.uniqueid';
import { useRef, useState } from 'react';
import { BodyGroupMap } from '../../../bodyGroups/typings';
import { ATTACK_SENSOR_LABEL, EPS } from '../../../constants';
import { Body } from '../../Body';
import { useBodyParams } from '../../Body/context';
import { SENSOR_HIDDEN_X, SENSOR_HIDDEN_Y, SENSOR_OPTIONS } from './contants';

type Props = {
  isHidden: boolean;
  width: number;
  height: number;
  bodyGroup?: BodyGroupMap[] | BodyGroupMap;
  onCollision: (e: Matter.IEventCollision<Matter.Engine>) => void;
};

export const ConnectedSensorController = ({
  width,
  height,
  isHidden,
  bodyGroup,
  onCollision,
}: Props) => {
  const { x, y, vx } = useBodyParams();
  const unicIdRef = useRef(uniqueId(ATTACK_SENSOR_LABEL));

  const [scaleX, setScaleX] = useState<1 | -1>(1);

  useTick(() => {
    if (scaleX !== 1 && vx > EPS) {
      setScaleX(1);
    }

    if (scaleX !== -1 && vx < -EPS) {
      setScaleX(-1);
    }
  });

  const sensorX = x && !isHidden ? x + scaleX * width * 0.75 : SENSOR_HIDDEN_X;
  const sensorY = y && !isHidden ? y : SENSOR_HIDDEN_Y;

  return (
    <Body
      bodyGroup={bodyGroup}
      x={sensorX}
      y={sensorY}
      width={width}
      height={height}
      options={SENSOR_OPTIONS}
      onCollision={onCollision}
      label={unicIdRef.current}
    />
  );
};
