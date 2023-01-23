import React, { useCallback, useMemo, useRef, useState } from 'react';
import { DAMAGABLE_BODY_GROUP } from '../../../bodyGroups/damagable';
import { useControlKey } from '../../../utils/useControlKey';
import { useBody } from '../../Body/context';
import { useHealth } from '../../HealthStorage/context';
import { ConnectedSensorController } from '../ConntectedSensorController';
import { isSensorLabel } from '../ConntectedSensorController/utils';
import { initialState, AttackingContextProvider, AttackingAnimationProvider } from './context';

const DAMAGE_VALUE = 1;

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
  const attackRef = useRef(false);

  const mouseCb = useCallback(() => {
    if (!body || attackRef.current) return;
    console.log('CB');
    setAttacting(true);
    attackRef.current = true;
  }, [body]);

  useControlKey('mouse', mouseCb);

  const onCollision = useCallback((e: Matter.IEventCollision<Matter.Engine>) => {
    if (!body) return;
    const collidedBodies = e.pairs.map(pair => isSensorLabel(pair.bodyA.label) ? pair.bodyB : pair.bodyA);

    const collidedBody = DAMAGABLE_BODY_GROUP.get().find(damagableBody => collidedBodies.includes(damagableBody));

    console.log('DAMAGING', DAMAGABLE_BODY_GROUP.get(), collidedBody);
    if (collidedBody?.id) {
      setHealth(value => value ? value - DAMAGE_VALUE : value, collidedBody.id);
    }
  }, [body, setHealth]);

  const cb = useCallback(() => {
    console.log('FINISHHHH');
    setAttacting(false);
    attackRef.current = false;
  }, []);

  const value = useMemo(() => ({
    isAttack: isAttacing,
    onActionFinish: cb,
  }), [cb, isAttacing]);


  return  (
    <AttackingContextProvider value={isAttacing}>
      <AttackingAnimationProvider value={value}>
        <ConnectedSensorController isHidden={!isAttacing} width={width} height={height} onCollision={onCollision} />
        {children}
      </AttackingAnimationProvider>
    </AttackingContextProvider>
)}
