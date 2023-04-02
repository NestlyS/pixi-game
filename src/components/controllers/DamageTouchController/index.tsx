import { useCallback } from 'react';
import { DAMAGING_BODY_GROUP } from '../../../bodyGroups/damaging';
import { useBody } from '../../Body/context';
import { CleanEventType } from '../../Body/typing';
import { useHealth } from '../../HealthStorage/context';
import { TouchController } from '../TouchController';

export const DamageTouchController = () => {
  const { body } = useBody();
  const { setHealth } = useHealth();

  const onTouch = useCallback(
    (e: CleanEventType) => {
      const isDamaged = e.pairs.find(
        (pair) =>
          DAMAGING_BODY_GROUP.get().includes(pair.bodyA) ||
          DAMAGING_BODY_GROUP.get().includes(pair.bodyB),
      );
      if (isDamaged) setHealth((hp) => hp && hp - 1, body);
    },
    [body, setHealth],
  );

  return <TouchController onTouch={onTouch} />;
};
