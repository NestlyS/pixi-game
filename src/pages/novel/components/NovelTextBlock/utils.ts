import { Sounds, playSound } from '../../../../utils/soundController';
import {
  CHARACTERS_TALKING_TYPES,
  LETTER_TO_SOUND_MAP,
  TalkingTypes,
  isLetterInSoundMap,
  isNameInTalkingTypes,
} from './contants';

let isLastSoundSounded = false;

export const getVoiceSoundWithTable = (letterToSound: string, characterName = 'Ева') => {
  const soundType = isLetterInSoundMap(letterToSound)
    ? LETTER_TO_SOUND_MAP[letterToSound] ?? TalkingTypes.Mid
    : TalkingTypes.Mid;

  const soundName = isNameInTalkingTypes(characterName)
    ? CHARACTERS_TALKING_TYPES[characterName][soundType]
    : Sounds.TalkingMid;

  if (isLastSoundSounded) {
    isLastSoundSounded = false;
    return;
  }
  playSound(soundName);
  isLastSoundSounded = true;
};
