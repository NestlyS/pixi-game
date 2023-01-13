import { useTick } from '@inlet/react-pixi';
import React, { useCallback, useState } from 'react';
import { DAMAGABLE_BODY_GROUP } from '../../../bodyGroups/damagable';
import { EPS } from '../../../constants';
import { useControlKey } from '../../../utils/useControlKey';
import { Body } from '../../Body';
import { useBody } from '../../Body/context';
import { useHealth } from '../../HealthStorage/context';
import { initialState, AttackingContextProvider } from './context';

const SENSOR_HIDDEN_X = -1000;
const SENSOR_HIDDEN_Y = -1000;
const SENSOR_LABEL = 'attack_sensor';

const DAMAGE_VALUE = 1;

const SENSOR_OPTIONS: Matter.IChamferableBodyDefinition = {
  isSensor: true,
  isStatic: true,
}

type Props = {
  children: React.ReactNode;
  width: number;
  height: number,
}

export const AttackController = ({
  children,
  width,
  height,
}: Props) => {
  const {
    body
  } = useBody();
  const {
    setHealth
  } = useHealth();

  const [isAttacing, setAttacting] = useState(initialState);
  const [scaleX, setScaleX] = useState<1 | -1>(1);

  useTick(() => {
    if (!body) {
      return;
    }

    if (scaleX !== 1 && body.velocity.x > EPS) {
      setScaleX(1);
    }

    if (scaleX !== -1 && body.velocity.x < -EPS) {
      setScaleX(-1);
    }
  });

  const mouseCb = useCallback(() => {
    if (!body) return;
    setAttacting(true);
  }, [body]);

  const unpressCb = useCallback(() => {
    if (!body) return;
    setAttacting(false);
  }, [body]);

  const onCollision = useCallback((e: Matter.IEventCollision<Matter.Engine>) => {
    if (!body) return;
    const collidedBodies = e.pairs.map(pair => pair.bodyA.label === SENSOR_LABEL ? pair.bodyB : pair.bodyA);

    const collidedBody = DAMAGABLE_BODY_GROUP.get().find(damagableBody => collidedBodies.includes(damagableBody));

    console.log('DAMAGING', DAMAGABLE_BODY_GROUP.get(), collidedBody);
    if (collidedBody?.id) {
      setHealth(value => value ? value - DAMAGE_VALUE : value, collidedBody.id);
    }
  }, [body, setHealth]);

  useControlKey('mouse', mouseCb, unpressCb);

  const sensorX = body && isAttacing ? body.position.x + scaleX * width * 0.75 : SENSOR_HIDDEN_X;
  const sensorY = body && isAttacing ? body.position.y : SENSOR_HIDDEN_Y;

  return  (
    <AttackingContextProvider value={isAttacing}>
      <Body x={sensorX} y={sensorY} width={width} height={height} options={SENSOR_OPTIONS} onCollision={onCollision} label={SENSOR_LABEL}/>
      {children}
    </AttackingContextProvider>
)}
