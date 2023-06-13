import { HoleType } from '../../../../../../../components/ui/FullscreenRect';

export type TutorialType = {
  text: string;
  width: number;
  position: 'left' | 'right' | 'middle';
  hole?: HoleType;
};
