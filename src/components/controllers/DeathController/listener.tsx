import { useEffect } from 'react';
import { useBody } from '../../Body/context';
import { useDeathWrapper } from './context';
import { useSelector } from 'react-redux';
import { selectHealthValueById } from '../../../redux/health/selectors';
import { getBodyId } from '../../../utils/getBodyId';

export const DeathListener = () => {
  const kill = useDeathWrapper();
  const { body } = useBody();
  const currentHealth = useSelector(selectHealthValueById(getBodyId(body)));

  useEffect(() => {
    if (currentHealth !== null && currentHealth <= 0) {
      kill(body);
    }
  }, [body, currentHealth, kill]);

  return null;
};
