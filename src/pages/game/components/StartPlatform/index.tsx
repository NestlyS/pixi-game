import { useSelector } from 'react-redux';
import { DefaultStartPlatform } from '../DefaultStartPlatform';
import { TutorialStartPlatform } from '../TutorialStartPlatform';
import { selectPageGameIsTutorialCompleted } from '../../../../redux/gamePage/selectors';
import { useState } from 'react';

type Props = {
  rightEdgeX: number;
  y: number;
};

export const StartPlatfrom = ({ rightEdgeX, y }: Props) => {
  const isTutorialCompleted = useSelector(selectPageGameIsTutorialCompleted);
  const [memoized] = useState(isTutorialCompleted);

  if (!memoized) {
    return <TutorialStartPlatform rightEdgeX={rightEdgeX} y={y} />;
  }

  return <DefaultStartPlatform rightEdgeX={rightEdgeX} y={y} />;
};
