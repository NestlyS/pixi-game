import { Sounds } from './constants';
import { SoundTypes } from './typings';

export const isSoundNameIsInSoundTypes = (key?: string): key is SoundTypes =>
  Object.values(SoundTypes).find((val) => val === key) !== undefined;

export const isSoundNameIsInSoundsEnum = (key?: string): key is Sounds =>
  Object.values(Sounds).find((val) => val === key) !== undefined;
