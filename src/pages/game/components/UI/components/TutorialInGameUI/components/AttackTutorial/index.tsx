import { useCallback, useEffect, useState } from 'react';
import { TutorialOnScreen } from '../TutorialOnScreen';
import { TutorialType } from '../typings';
import { SignalList, emitKeyboardSignal } from '../../../../../../../../utils/signaller/emitSignal';
import { ATTACK_KEY_CODE } from '../../../../../../../../constants';
import { useControlKey2 } from '../../../../../../../../utils/useControlKey';

const TUTORIAL_CONFIG: TutorialType[] = [
  {
    text: 'Эта куча мусора - опасный враг. \n Нажми [E] или на эту кнопку, чтобы атаковать его!',
    position: 'right',
    width: 0.25,
    hole: {
      x: 0.735,
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

export const AttackTutorial = ({ onEnd }: Props) => {
  const [step, setStep] = useState(0);

  const onClick = useCallback(() => {
    setStep((val) => val + 1);
  }, []);

  const onFinalClick = useCallback(() => {
    if (step < TUTORIAL_CONFIG.length - 1) return;
    setStep((val) => val + 1);
  }, [step]);

  useControlKey2(ATTACK_KEY_CODE, onFinalClick);

  useEffect(() => {
    if (step >= TUTORIAL_CONFIG.length) {
      onEnd(() => {
        emitKeyboardSignal(SignalList.KeyDown, { code: ATTACK_KEY_CODE });
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
