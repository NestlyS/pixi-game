import { Body } from 'matter-js';
import { useCallback } from 'react';
import { Container } from '@pixi/display/lib/Container';

import { DeathWrapper } from '../../DeathController/wrapper';
import { AnimationList, useAnimationController } from '../../AnimationController/context';
import { SignalList, emitSignal } from '../../../../utils/signaller/emitSignal';
import { useContainer } from '../../ViewController/context';
import { SoundTypes, Sounds, playSound } from '../../../../utils/soundController';

type Props = {
  cooldown?: number;
  onDeath?: (body?: Body) => void;
  children: React.ReactNode;
};

/**
 * Из-за того, что спрайт не может корректно определить свое расположение относительно пола,
 *  мы ему с этим помогаем, сдвигая на самую узкую часть объекта.
 * Мне вообще не нравится это решение, но пока что оно самое очевидное.
 */
const moveSpriteCenter = (container: Container, offset: number) => {
  container.pivot.set(container.pivot.x, offset);
};

export const MainUserDeathWrapper = ({ cooldown = 0, onDeath, children }: Props) => {
  const { requestAnimation } = useAnimationController();
  const container = useContainer<Container>();

  const onDeathHandler = useCallback(
    (body?: Body) => {
      requestAnimation({
        name: AnimationList.Die,
        onFinish: () => emitSignal(SignalList.GameOver),
      });
      onDeath?.(body);
      if (container) moveSpriteCenter(container, -3);
      playSound(Sounds.Death, SoundTypes.Sound);
    },
    [onDeath, requestAnimation, container],
  );

  return (
    <DeathWrapper cooldown={cooldown} onDeath={onDeathHandler}>
      {children}
    </DeathWrapper>
  );
};
