import { useCallback, useEffect, useState } from 'react';
import { TutorialOnScreen } from '../TutorialOnScreen';
import { TutorialType } from '../typings';

const TUTORIAL_CONFIG: TutorialType[] = [
  {
    text: 'Приветствуем в обучении ECO RUSH! \n Это быстро!',
    position: 'middle',
    width: 0.7,
  },
  {
    text: 'Цель игры - собрать как можно больше мусора.',
    position: 'middle',
    width: 0.7,
  },
  {
    text: 'Это кнопки управления персонажем - прыжок и приседание. \n\n Помогут вам обходить препятствия!',
    position: 'left',
    hole: {
      x: 0.05,
      y: 0.79,
      width: 0.25,
      height: 0.2,
      withLine: true,
    },
    width: 0.3,
  },
  {
    text: 'А это кнопки способностей персонажа - атака и спецприем. \n\n Позволят вашему персонажу заходить ещё дальше!',
    position: 'right',
    hole: {
      x: 0.735,
      y: 0.79,
      width: 0.25,
      height: 0.2,
      withLine: true,
    },
    width: 0.3,
  },
  {
    text: 'Это все! Удачного сбора мусора!',
    position: 'middle',
    width: 0.7,
  },
];

type Props = {
  onEnd: () => void;
};

export const StartTutorial = ({ onEnd }: Props) => {
  const [step, setStep] = useState(0);

  const onClick = useCallback(() => {
    setStep((val) => val + 1);
  }, []);

  useEffect(() => {
    if (step >= TUTORIAL_CONFIG.length) {
      onEnd();
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
