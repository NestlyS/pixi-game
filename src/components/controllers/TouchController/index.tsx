import React, { useEffect } from 'react';
import { CleanEventType } from '../../Body/typing';
import { useBody } from '../../Body/context';
import { useHealth } from '../../HealthStorage/context';

type Props = {
  onTouch: (e: CleanEventType) => void;
};

export const TouchController = ({ onTouch }: Props) => {
  const { setHealth } = useHealth();
  const { body, onCollision, clearCollision } = useBody();

  useEffect(() => {
    onCollision(onTouch);
    return () => clearCollision(onTouch);
  }, [body, clearCollision, onCollision, onTouch, setHealth]);

  return null;
};
