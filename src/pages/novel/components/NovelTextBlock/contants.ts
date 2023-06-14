import { Sounds } from '../../../../utils/soundController';

export const BLOCK_RADIUS = 25;

export const NOVEL_INTERVAL = 30;

export const TEXT_PADDING = 30;

export enum TalkingTypes {
  High = 'high',
  Mid = 'mid',
  Low = 'low',
}

export const CHARACTERS_TALKING_TYPES = {
  Мери: {
    [TalkingTypes.Low]: Sounds.MaryTalkingLow,
    [TalkingTypes.Mid]: Sounds.MaryTalkingMid,
    [TalkingTypes.High]: Sounds.MaryTalkingHigh,
  },
  Ева: {
    [TalkingTypes.Low]: Sounds.TalkingLow,
    [TalkingTypes.Mid]: Sounds.TalkingMid,
    [TalkingTypes.High]: Sounds.TalkingHigh,
  },
  Эрнест: {
    [TalkingTypes.Low]: Sounds.ErnestTalkingLow,
    [TalkingTypes.Mid]: Sounds.ErnestTalkingMid,
    [TalkingTypes.High]: Sounds.ErnestTalkingHigh,
  },
  Незнакомец: {
    [TalkingTypes.Low]: Sounds.GermanTalkingMid,
    [TalkingTypes.Mid]: Sounds.GermanTalkingMid,
    [TalkingTypes.High]: Sounds.GermanTalkingHigh,
  },
  Герман: {
    [TalkingTypes.Low]: Sounds.GermanTalkingHigh,
    [TalkingTypes.Mid]: Sounds.GermanTalkingMid,
    [TalkingTypes.High]: Sounds.GermanTalkingHigh,
  },
  'Милый незнакомец': {
    [TalkingTypes.Low]: Sounds.MilenTalkingLow,
    [TalkingTypes.Mid]: Sounds.MilenTalkingMid,
    [TalkingTypes.High]: Sounds.MilenTalkingHigh,
  },
  Милен: {
    [TalkingTypes.Low]: Sounds.MilenTalkingLow,
    [TalkingTypes.Mid]: Sounds.MilenTalkingMid,
    [TalkingTypes.High]: Sounds.MilenTalkingHigh,
  },
};

export const isNameInTalkingTypes = (name: string): name is keyof typeof CHARACTERS_TALKING_TYPES =>
  name in CHARACTERS_TALKING_TYPES;

export const LETTER_TO_SOUND_MAP = {
  а: TalkingTypes.High,
  б: TalkingTypes.High,
  в: TalkingTypes.High,
  г: TalkingTypes.High,
  д: TalkingTypes.High,
  е: TalkingTypes.High,
  ё: TalkingTypes.Mid,
  ж: TalkingTypes.Mid,
  з: TalkingTypes.High,
  и: TalkingTypes.High,
  й: TalkingTypes.Low,
  к: TalkingTypes.Low,
  л: TalkingTypes.Low,
  м: TalkingTypes.Low,
  н: TalkingTypes.Low,
  о: TalkingTypes.Mid,
  п: TalkingTypes.Low,
  р: TalkingTypes.Low,
  с: TalkingTypes.Low,
  т: TalkingTypes.Low,
  у: TalkingTypes.Mid,
  ф: TalkingTypes.Low,
  х: TalkingTypes.Low,
  ц: TalkingTypes.Mid,
  ч: TalkingTypes.Low,
  ш: TalkingTypes.Mid,
  щ: TalkingTypes.High,
  ь: TalkingTypes.Low,
  ъ: TalkingTypes.Low,
  ы: TalkingTypes.High,
  э: TalkingTypes.Mid,
  ю: TalkingTypes.Low,
  я: TalkingTypes.High,
};

export const isLetterInSoundMap = (letter: string): letter is keyof typeof LETTER_TO_SOUND_MAP =>
  letter in LETTER_TO_SOUND_MAP;
