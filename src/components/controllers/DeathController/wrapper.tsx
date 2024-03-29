import { Body } from 'matter-js';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  DeathListenerContextProvider,
  DeathWrapperContextProvider,
  KillDispatcher,
} from './context';

type Props = {
  cooldown?: number;
  onDeath?: (body?: Body) => void;
  children: React.ReactNode;
};

export const DeathWrapper = ({ cooldown = 0, onDeath, children }: Props) => {
  const [isVisible, setVisibility] = useState(true);
  const [isDeadBody, setDeadBody] = useState<Body | undefined>();
  // TODO Плохо реагиует на паузу, пофиксить
  const callbacksRef = useRef<(() => void)[]>([]);

  useEffect(() => {
    if (!isDeadBody) return;

    callbacksRef.current.forEach((cb) => cb());
    const deadCallback = () => {
      setVisibility(false);
      onDeath?.(isDeadBody);
    };

    setTimeout(deadCallback, cooldown);
  }, [cooldown, isDeadBody, onDeath]);

  const kill = useCallback<KillDispatcher>((body) => {
    setDeadBody(body);
  }, []);

  if (!isVisible) return null;

  return (
    <DeathWrapperContextProvider value={kill}>
      <DeathListenerContextProvider value={!!isDeadBody}>{children}</DeathListenerContextProvider>
    </DeathWrapperContextProvider>
  );
};
