import { useEffect } from 'react';
import { useBody } from '../../Body/context';
import { useBodyHealth } from '../HealthController/context';
import { useDeathWrapper } from './context';

export const DeathListener = () => {
  const kill = useDeathWrapper();
  const { body } = useBody();
  const { currentHealth } = useBodyHealth();

  useEffect(() => {
    if (currentHealth !== null && currentHealth <= 0) {
      kill(body ?? undefined);
    }
  }, [body, currentHealth, kill]);

  return null;
};
