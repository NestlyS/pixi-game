import { Container } from '@pixi/react';
import { DisplayObject, Container as PIXI_Container } from 'pixi.js';
import { ease } from 'pixi-ease';
import { useSelector } from 'react-redux';
import { useCallback, useRef, useState } from 'react';
import {
  selectAppControllerWidth,
  selectAppControllerHeight,
} from '../../../../redux/appController/selectors';
import { AnimatedPart } from './components/AnimatedPart';
import { AnimatedText } from './components/AnimatedText';
import { Sounds, playSound } from '../../../../utils/soundController';
import { useControlKey2 } from '../../../../utils/useControlKey';

const EVA_TEXTURE_URL = 'eva.png';
const EVA_TEXTURE_HEIGHT = 2184;
const EVA_ANCHOR = { x: 1, y: 0 };

const MONSTER_TEXTURE_URL = 'monster.png';
const MONSTER_ANCHOR = { x: 0, y: 0 };

const LABEL_TEXTURE_URL = 'name.png';
const LABEL_ANCHOR = { x: 0.5, y: 0.5 };

const getSoundDependsStep = (step: number): Sounds => {
  if (step >= 3) {
    return Sounds.HardEffect;
  }

  return Sounds.LightEffect;
};

type Props = {
  onEnd: () => void;
};

export const StartAnimation = ({ onEnd }: Props) => {
  const screenWidth = useSelector(selectAppControllerWidth);
  const screenHeight = useSelector(selectAppControllerHeight);
  const [steps, setStep] = useState(1);
  const stepRef = useRef(steps);
  stepRef.current = steps;

  const ref = useRef<PIXI_Container<DisplayObject>>(null);

  const onStepEnd = useCallback(() => {
    setStep((val) => val + 1);

    playSound(getSoundDependsStep(stepRef.current));

    if (!ref.current) return;

    ease.add(ref.current, { shake: 20 }, { duration: 50 });
  }, []);

  const charScale = (screenHeight / EVA_TEXTURE_HEIGHT) * 0.8;

  const onAnyButton = useCallback(() => {
    if (stepRef.current < 4) return;

    onEnd();
  }, [onEnd]);

  useControlKey2('any', onAnyButton);

  return (
    <Container ref={ref}>
      <AnimatedPart
        x={screenWidth * 1.2}
        y={screenHeight * 0.4}
        scale={charScale}
        animateToX={screenWidth * 0.1}
        textureUrl={MONSTER_TEXTURE_URL}
        anchor={MONSTER_ANCHOR}
        duration={600}
        onComplete={onStepEnd}
      />
      {steps >= 2 && (
        <AnimatedPart
          x={-screenWidth * 0.2}
          y={screenHeight * 0.03}
          scale={charScale}
          animateToX={screenWidth * 0.6}
          textureUrl={EVA_TEXTURE_URL}
          anchor={EVA_ANCHOR}
          duration={600}
          onComplete={onStepEnd}
        />
      )}
      {steps >= 3 && (
        <AnimatedPart
          x={screenWidth * 0.5}
          y={screenHeight * 0.55}
          scale={charScale * 4}
          rotateTo={-0.3}
          scaleTo={charScale * 2}
          textureUrl={LABEL_TEXTURE_URL}
          anchor={LABEL_ANCHOR}
          duration={600}
          onComplete={onStepEnd}
        />
      )}
      {steps >= 4 && (
        <AnimatedText x={screenWidth * 0.5} y={screenHeight * 0.93} anchor={LABEL_ANCHOR} />
      )}
    </Container>
  );
};
