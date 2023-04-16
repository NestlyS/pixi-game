import { useEffect } from 'react';
import { CleanEventType } from '../../Body/typing';
import { useBody } from '../../Body/context';

type Props = {
  onTouch: (e: CleanEventType) => void;
};

export const TouchController = ({ onTouch }: Props) => {
  const { body, onCollision, clearCollision } = useBody();

  useEffect(() => {
    onCollision(onTouch);
    return () => clearCollision(onTouch);
  }, [body, clearCollision, onCollision, onTouch]);

  return null;
};
