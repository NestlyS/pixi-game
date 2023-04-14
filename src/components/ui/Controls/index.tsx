import { useApp } from '@pixi/react';
import { ButtonJump } from './components/ButtonJump';
import { ButtonSlide } from './components/ButtonSlide';
import { ButtonAttack } from './components/ButtonAttack';
import { ButtonHeal } from './components/ButtonHeal';


export const Controls = () => {
  const app = useApp();
  const { width, height } = app.screen;

  return (
    <>
      <ButtonJump
        y={height - 100}
        x={width * (0.5 / 8)}
      />
      <ButtonSlide
        y={height - 100}
        x={width * (1.5 / 8)}
      />
      <ButtonAttack
        y={height - 100}
        x={width * (6 / 8)}
      />
      <ButtonHeal
        y={height - 100}
        x={width * (7 / 8)}
      />
    </>
  )
}
