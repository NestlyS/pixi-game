import { Sounds } from './constants';

export enum SoundTypes {
  Music = 'music',
  Sound = 'sound',
}

export type SoundManifestType = {
  bundles: {
    [x: string]: Record<
      string,
      {
        src: string;
        type: SoundTypes;
        rate?: number;
        volume?: number;
      }
    >;
  };
};

export type SoundMapType = Record<SoundTypes, Sounds[]>;
