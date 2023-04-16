import { useApp } from '@pixi/react';
import { useMemo } from 'react';

export const useScreenHeight = () => {
  const app = useApp();
  return useMemo(() => {
    return app.screen.height;
  }, [app.screen.height]);
};
