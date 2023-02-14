import { useCallback, useEffect } from 'react';
import { DAMAGING_BODY_GROUP } from '../../../bodyGroups/damaging';
import { useBody } from '../../Body/context';
import { CleanEventType } from '../../Body/typing';
import { useBodyHealth } from '../HealthController/context';

export const DamageTouchController = () => {
  const { makeDamage } = useBodyHealth();

  const { onCollision, clearCollision } = useBody();

  useEffect(() => {
    const cb = (e: CleanEventType) => {
      const isDamaged = e.pairs.find(
        (pair) =>
          DAMAGING_BODY_GROUP.get().includes(pair.bodyA) ||
          DAMAGING_BODY_GROUP.get().includes(pair.bodyB),
      );
      if (isDamaged && makeDamage) makeDamage(1);
    };

    onCollision(cb);
    return () => clearCollision(cb);
  }, [clearCollision, makeDamage, onCollision]);

  return null;
};
