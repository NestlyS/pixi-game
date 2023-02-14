import { useEffect } from 'react';
import { useBodyHealth } from '../HealthController/context';
import { useDeathWrapper } from './context';

export const DeathListener = () => {
  const kill = useDeathWrapper();
  const { currentHealth } = useBodyHealth();

  useEffect(() => {
    if (currentHealth !== null && currentHealth <= 0) {
      kill();
    }
  }, [currentHealth, kill]);

  return null;
};
