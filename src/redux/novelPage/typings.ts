import { Sounds } from '../../utils/soundController';

export enum ActionTypes {
  Default = 'default',
  ScreenTransition = 'screenTransition',
  ScreenFade = 'screenFade',
}

export enum CharSides {
  Left = 'left',
  Right = 'right',
}

export enum CharNames {
  Mary = 'mary',
  Eva = 'eva',
  Gnida = 'gnida',
  GnidaHide = 'gnida-unknown',
  Ernest = 'ernest',
  MilenHide = 'milen-unknown',
  Milen = 'milen',
}

export type CharacterScriptData = {
  state?: string;
  name?: CharNames | null;
  pose?: string;
};

export type NewChunkScriptType<T = string> = {
  left?: CharacterScriptData | null;
  right?: CharacterScriptData | null;
  background?: string;
  actionType?: ActionTypes;
  active?: T;
  sound?: string;
  effect?: NOVEL_EFFECTS;
  text: string;
};

export enum Dialogs {
  First = 'dialog1',
  Gnida = 'gnidaTalk',
  Milen = 'milenTalk',
}

export type CharacterStatus = {
  isActive: boolean;
  state: string;
  name: CharNames | null;
  pose: string;
};

export enum NOVEL_EFFECTS {
  Shaking = 'shaking',
}

export type NovelControllerState = {
  script: NewScriptType | null;
  page: number;
  currentDialog: Dialogs;
  background: string;
  text: string;
  leftCharacter: CharacterStatus;
  rightCharacter: CharacterStatus;
  sound: Sounds | null;
  effect: NOVEL_EFFECTS | null;
  actionType: ActionTypes;
};

export type NewScriptType = Record<Dialogs, NewChunkScriptType[]>;

export type GetDataType = <T>(data: T | undefined, deft: T) => T;
