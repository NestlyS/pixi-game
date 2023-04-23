import { PlayOptions, sound as Sound } from '@pixi/sound';
import { Assets } from 'pixi.js';

const SOUND_VOLUME = 0.05;

export const initSoundBundle = (bundleName: string) => {
  const screenSoundBundle = Assets.cache.get('sound-manifest')?.bundles[bundleName];
  Sound.add(screenSoundBundle);
};

export const playSound = (soundName: string, options: PlayOptions = {}) => {
  Sound.play(soundName, { volume: SOUND_VOLUME, ...options });
};

export const stopSound = (soundName: string) => {
  Sound?.pause(soundName);
};
