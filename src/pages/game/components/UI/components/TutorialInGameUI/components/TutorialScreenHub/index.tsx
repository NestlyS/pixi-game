import { useSelector } from 'react-redux';
import { selectPageGameCurrentPage } from '../../../../../../../../redux/gamePage/selectors';
import { Pages } from '../../../../../../../../redux/gamePage/typings';
import { StartTutorial } from '../StartTutorial';
import { AttackTutorial } from '../AttackTutorial';
import { JumpTutorial } from '../JumpTutorial';
type Props = {
  onEnd: (cb?: () => void) => void;
};

export const TutorialScreenHub = ({ onEnd }: Props) => {
  const page = useSelector(selectPageGameCurrentPage);

  if (page === Pages.TutorialStart) {
    return <StartTutorial onEnd={onEnd} />;
  }

  if (page === Pages.TutorialAttack) {
    return <AttackTutorial onEnd={onEnd} />;
  }

  if (page === Pages.TutorialJump) {
    return <JumpTutorial onEnd={onEnd} />;
  }

  return null;
};
