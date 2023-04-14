import { memo, useEffect, useMemo, useState } from 'react';
import { useBody } from '../../Body/context';
import { useGlobalViewportShaking } from '../../GlobalViewport/hooks';
import { useHealth } from '../../HealthStorage/context';
import { getBodyId } from '../../HealthStorage/utils';
import { AnimationList, useAnimationController } from '../AnimationController/context';
import { BodyHealthContextProvider } from './context';

type Props = {
  initialHealth: number;
  children?: React.ReactNode;
  cooldown?: number;
};

export const HealthController = memo(({ initialHealth, children, cooldown }: Props) => {
  const { body } = useBody();
  const { requestAnimation, releaseAnimation } = useAnimationController();
  const shakeViewport = useGlobalViewportShaking();
  const id = useMemo(() => getBodyId(body), [body]);

  const { currentHealth, setHealth, onCooldown, clearCooldown } = useHealth(id);

  const [isCooldown, setCooldown] = useState(false);

  useEffect(() => {

    setHealth(initialHealth, id, cooldown);
  }, [cooldown, id, initialHealth, setHealth]);

  useEffect(() => {
    const cb = (cooldown: boolean) => {
      setCooldown(cooldown);
    };

    onCooldown(cb, id);

    return () => clearCooldown(cb, id);
  }, [clearCooldown, id, onCooldown]);

  useEffect(() => {
    if (isCooldown) {
      shakeViewport();
      requestAnimation({ name: AnimationList.Hurt });
    }

    if (!isCooldown) {
      releaseAnimation(AnimationList.Hurt);
    }
  }, [isCooldown, releaseAnimation, requestAnimation, shakeViewport]);

  const value = useMemo(() => {
    return {
      isCooldown,
      currentHealth,
    };
  }, [isCooldown, currentHealth]);

  return <BodyHealthContextProvider value={value}>{children}</BodyHealthContextProvider>;
});

