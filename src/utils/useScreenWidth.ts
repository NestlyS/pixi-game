import { useApp } from '@pixi/react';
import { useMemo } from 'react';

export const useScreenWidth = () => {
  const app = useApp();
  return useMemo(() => {
    return app.screen.width;
  }, [app.screen.width]);
};
