import { Container } from '@pixi/react';
import { useCallback, useState } from 'react';

import { Background } from '../Background';
import { StartAnimation } from '../StartAnimation';
import { playSound, Sounds } from '../../../../utils/soundController';
import { ScreenTransition } from '../../../../components/ui/ScreenTransition';
import { COLORS } from '../../../../constants';

type Props = {
  onEnd: () => void;
};

export const StartUI = ({ onEnd }: Props) => {
  const [isInited, setInit] = useState(false);

  const _onEnd = useCallback(() => {
    if (isInited) return;

    playSound(Sounds.Collect);

    setInit(true);
  }, [isInited]);

  return (
    <Container>
      <Background />
      <StartAnimation onEnd={_onEnd} />
      {isInited && (
        <ScreenTransition
          color={COLORS.White}
          alpha={0}
          toAlpha={1}
          duration={500}
          onComplete={onEnd}
        />
      )}
    </Container>
  );
};
