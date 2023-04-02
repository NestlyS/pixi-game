import { Body } from 'matter-js';
import { useCallback } from 'react';
import { DeathWrapper } from '../DeathController/wrapper';
import { AnimationList, useAnimationController } from '../AnimationController/context';
import { SignalList, emitSignal } from '../../../utils/signaller/emitSignal';

type Props = {
  cooldown?: number;
  onDeath?: (body?: Body) => void;
  children: React.ReactNode;
};

export const MainUserDeathWrapper = ({ cooldown = 0, onDeath, children }: Props) => {
  const { requestAnimation } = useAnimationController();

  const onDeathHandler = useCallback(
    (body?: Body) => {
      requestAnimation({
        name: AnimationList.Die,
        onFinish: () => emitSignal(SignalList.GameOver),
      });
      onDeath?.(body);
    },
    [onDeath, requestAnimation],
  );

  return (
    <DeathWrapper cooldown={cooldown} onDeath={onDeathHandler}>
      {children}
    </DeathWrapper>
  );
};
