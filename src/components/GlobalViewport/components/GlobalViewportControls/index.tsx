import { Viewport } from 'pixi-viewport';
import { useGlobalViewportControls } from '../../hooks';

type Props = {
  viewport: Viewport | null;
};

export const GlobalViewportControls = ({ viewport }: Props) => {
  useGlobalViewportControls(viewport);

  return null;
};
