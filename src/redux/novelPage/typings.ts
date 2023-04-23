export type DialogElement<T = string> = {
  active: T;
  state: string;
  text: string;
};

export type ScriptType<T = string> = {
  leftPerson: T | null;
  rightPerson: T | null;
  background: string;
  dialog: DialogElement<T>[];
};
