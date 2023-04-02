import React, { useCallback, useMemo, useRef, useState } from 'react';
import { DAMAGABLE_BODY_GROUP } from '../../../bodyGroups/damagable';
import { USER_BODY_GROUP } from '../../../bodyGroups/user';
import { useControlKey } from '../../../utils/useControlKey';
import { useBody } from '../../Body/context';
import { applyForce } from '../../Body/utils';
import { useHealth } from '../../HealthStorage/context';
import { getBodyId } from '../../HealthStorage/utils';
import { AnimationList, useAnimationController } from '../AnimationController/context';
import { ConnectedSensorController } from '../ConntectedSensorController';
import { isSensorLabel } from '../ConntectedSensorController/utils';
import { initialState, AttackingContextProvider, AttackingAnimationProvider } from './context';
import { usePausedState } from '../../ui/Settings/context';

const DAMAGE_VALUE = 1;
const ATTACK_BOOST = -5;

type Props = {
  children: React.ReactNode;
  width: number;
  height: number;
};

export const AttackController = ({ children, width, height }: Props) => {
  const { body } = useBody();
  const { setHealth } = useHealth();
  const { releaseAnimation, requestAnimation } = useAnimationController();
  const isPaused = usePausedState();

  const [isAttacing, setAttacting] = useState(initialState);
  const attackRef = useRef(false);

  const onCollision = useCallback(
    (e: Matter.IEventCollision<Matter.Engine>) => {
      const collidedBodies = e.pairs.map((pair) =>
        isSensorLabel(pair.bodyA.label) ? pair.bodyB : pair.bodyA,
      );

      const collidedBody = DAMAGABLE_BODY_GROUP.get().find((damagableBody) =>
        collidedBodies.includes(damagableBody),
      );

      console.log('DAMAGING', DAMAGABLE_BODY_GROUP.get(), collidedBody);
      if (collidedBody?.id) {
        setHealth((value) => (value ? value - DAMAGE_VALUE : value), getBodyId(collidedBody));
      }
    },
    [setHealth],
  );

  const cb = useCallback(() => {
    releaseAnimation(AnimationList.Attack);
    setAttacting(false);
    attackRef.current = false;
  }, [releaseAnimation]);

  const mouseCb = useCallback(() => {
    if (isPaused) return;

    requestAnimation({ name: AnimationList.Attack, onFinish: cb });
    setAttacting(true);
    attackRef.current = true;
    applyForce(body, body.velocity.x, ATTACK_BOOST);
  }, [body, cb, isPaused, requestAnimation]);

  useControlKey('mouse', mouseCb);

  const value = useMemo(
    () => ({
      isAttack: isAttacing,
      onActionFinish: cb,
    }),
    [cb, isAttacing],
  );

  return (
    <AttackingContextProvider value={isAttacing}>
      <AttackingAnimationProvider value={value}>
        <ConnectedSensorController
          isHidden={!isAttacing}
          bodyGroup={USER_BODY_GROUP}
          width={width}
          height={height}
          onCollision={onCollision}
        />
        {children}
      </AttackingAnimationProvider>
    </AttackingContextProvider>
  );
};
