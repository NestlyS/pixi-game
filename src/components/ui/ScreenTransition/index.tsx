import { COLORS } from '../../../constants';
import React from 'react';
import { FullscreenRect } from '../FullscreenRect';
import { ContainerTransition } from '../ContainerTransition';

type Props = {
  color: COLORS;
  alpha?: number;
  toColor?: COLORS;
  toAlpha?: number;
  duration: number;
  onComplete?: () => void;
};

export const ScreenTransition = React.memo(
  ({ color, alpha = 1, toColor, toAlpha = 0, duration, onComplete }: Props) => {
    return (
      <>
        {toColor && <FullscreenRect color={toColor} />}
        <ContainerTransition
          fromAlpha={alpha}
          toAlpha={toAlpha}
          duration={duration}
          onComplete={onComplete}
        >
          <FullscreenRect color={color} />
        </ContainerTransition>
      </>
    );
  },
);
