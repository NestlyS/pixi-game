import { useEffect } from 'react';
import { Sounds, playSound, stopSound } from './soundController';

export const useBackgroundMusic = (musicName: Sounds | null, isStopped: boolean) => {
  useEffect(() => {
    if (!musicName) return;

    if (isStopped) {
      stopSound(musicName);
      return;
    }

    playSound(musicName, {
      loop: true,
    });

    return () => stopSound(musicName);
  }, [isStopped, musicName]);
};
