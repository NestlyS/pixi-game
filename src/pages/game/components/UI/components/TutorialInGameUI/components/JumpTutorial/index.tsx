import { useCallback, useEffect, useState } from 'react';
import { TutorialOnScreen } from '../TutorialOnScreen';
import { TutorialType } from '../typings';
import { SignalList, emitKeyboardSignal } from '../../../../../../../../utils/signaller/emitSignal';
import { JUMP_KEY_CODE } from '../../../../../../../../constants';
import { useControlKey2 } from '../../../../../../../../utils/useControlKey';

const TUTORIAL_CONFIG: TutorialType[] = [
  {
    text: 'Аккуратно, в этой яме стекло и мусор! \n Нажми [W] или на кнопку ниже, чтобы перепрыгнуть её!',
    position: 'left',
    width: 0.3,
    hole: {
      x: 0.05,
      y: 0.79,
      width: 0.12,
      height: 0.2,
      withLine: true,
    },
  },
];

type Props = {
  onEnd: (cb?: () => void) => void;
};

export const JumpTutorial = ({ onEnd }: Props) => {
  const [step, setStep] = useState(0);

  const onClick = useCallback(() => {
    setStep((val) => val + 1);
  }, []);

  const onFinalClick = useCallback(() => {
    if (step < TUTORIAL_CONFIG.length - 1) return;
    setStep((val) => val + 1);
  }, [step]);

  useControlKey2(JUMP_KEY_CODE, onFinalClick);

  useEffect(() => {
    if (step >= TUTORIAL_CONFIG.length) {
      onEnd(() => {
        emitKeyboardSignal(SignalList.KeyDown, { code: JUMP_KEY_CODE });
        // setTimeout(() => emitKeyboardSignal(SignalList.KeyUp, { code: JUMP_KEY_CODE }), 200);
      });
    }
  }, [onEnd, step]);

  if (step >= TUTORIAL_CONFIG.length) return null;

  return (
    <TutorialOnScreen
      text={TUTORIAL_CONFIG[step].text}
      textPosition={TUTORIAL_CONFIG[step].position}
      textWidth={TUTORIAL_CONFIG[step].width}
      hole={TUTORIAL_CONFIG[step].hole}
      onClick={onClick}
    />
  );
};
