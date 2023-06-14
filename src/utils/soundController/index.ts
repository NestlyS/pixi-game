import { Assets } from 'pixi.js';
import { Howl } from 'howler';
import { __IS_DEV__ } from '../../constants';
import { Sounds, SOUND_VOLUME } from './constants';
import { SoundMapType, SoundTypes, SoundManifestType } from './typings';
import { isSoundNameIsInSoundTypes, isSoundNameIsInSoundsEnum } from './utils';

export { Sounds } from './constants';
export { SoundTypes } from './typings';

export const soundMap: SoundMapType = {
  [SoundTypes.Sound]: [],
  [SoundTypes.Music]: [],
};

export const soundEnabledMap: Record<SoundTypes, boolean> = {
  [SoundTypes.Sound]: true,
  [SoundTypes.Music]: true,
};

let isActiveTab = true;

// Написать версию, которая сама может брать данные из стора
export const playSound = (soundName: Sounds, options: { loop?: boolean } = {}) => {
  const soundType = Object.entries(soundMap).find(([_, list]) =>
    list.find((innerSound) => innerSound === soundName),
  )?.[0];

  if (!isActiveTab || !isSoundNameIsInSoundTypes(soundType) || !soundEnabledMap[soundType]) return;

  const sound = Assets.cache.get<Howl>(soundName);

  if (!sound) return;

  if (options.loop) sound.loop(true);
  sound.play();
};

export const stopSound = (soundName: Sounds) => {
  const sound = Assets.cache.get<Howl>(soundName);

  if (!sound) return;

  sound.pause();
};

export const muteSound = (soundName: string) => {
  const sound = Assets.cache.get<Howl>(soundName);

  if (!sound) return;

  sound.mute();
};

export const unmuteSound = (soundName: string) => {
  const sound = Assets.cache.get<Howl>(soundName);

  if (!sound) return;

  sound.mute(false);
};

export const muteAllSounds = (type: SoundTypes) => {
  Object.values(soundMap[type]).forEach((value) => {
    stopSound(value);
    muteSound(value);
  });
};

export const muteAll = () => {
  Object.keys(soundMap).forEach((key) => {
    if (!isSoundNameIsInSoundTypes(key)) return;

    muteAllSounds(key);
  });
};

export const unmuteAllSounds = (type: SoundTypes) => {
  Object.values(soundMap[type]).forEach((value) => {
    unmuteSound(value);
  });
};

export const unmuteAll = () => {
  Object.keys(soundMap).forEach((key) => {
    if (!isSoundNameIsInSoundTypes(key)) return;

    unmuteAllSounds(key);
  });
};

export const syncSoundsWithSettings = (type: SoundTypes, prevValue: boolean) => {
  if (soundEnabledMap[type] === true && soundEnabledMap[type] !== prevValue) {
    unmuteAllSounds(type);
  }

  if (soundEnabledMap[type] === false && soundEnabledMap[type] !== prevValue) {
    muteAllSounds(type);
  }
};

export const initSoundBundle = (bundleName: string) => {
  const screenSoundBundle = (Assets.cache.get('sound-manifest') as SoundManifestType)?.bundles[
    bundleName
  ];

  const newSoundMap = Object.entries(screenSoundBundle).reduce(
    (acc, [key, obj]) => {
      if (!isSoundNameIsInSoundsEnum(key)) {
        throw Error(`${key} звука не существует`);
      }

      if (Assets.cache.has(key)) {
        if (__IS_DEV__) console.error('Звук уже существует');
        return acc;
      }

      const { src, type, rate, volume } = obj;

      const sound = new Howl({
        src: [src],
        volume: (volume ?? 1) * SOUND_VOLUME,
        // rate: 0.7,
      });

      Assets.cache.set(key, sound);

      acc[type] = [...acc[type], key];

      return acc;
    },
    { [SoundTypes.Sound]: [], [SoundTypes.Music]: [] } as SoundMapType,
  );

  Object.entries(newSoundMap).forEach(([type, value]) => {
    if (!isSoundNameIsInSoundTypes(type)) return;

    soundMap[type] = [...soundMap[type], ...value];
  });

  window.document.body.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      isActiveTab = true;
      unmuteAll();
    } else {
      isActiveTab = false;
      muteAll();
    }
  });
};

export const syncSoundSettings = (isMusicOn: boolean, isSoundOn: boolean) => {
  soundEnabledMap[SoundTypes.Music] = isMusicOn;
  soundEnabledMap[SoundTypes.Sound] = isSoundOn;
};
