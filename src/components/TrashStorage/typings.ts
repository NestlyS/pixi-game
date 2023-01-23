export type TrashTypes = 'bottle' | 'chips' | 'paper';
export type onChangeListener = (type: TrashTypes, value: number) => void;
export type TrashMap = Record<TrashTypes, { value: number, listeners: onChangeListener[]}>;
export type TrashState = Record<number | string, TrashMap>;

export type State = {
  get: (id: number | string, type: TrashTypes) => number | null,
  set: (id: number | string, type: TrashTypes, value: number | ((prev: number) => number)) => void,
  onChange: (id: number | string, type: TrashTypes, cb: onChangeListener) => void,
  clearOnChange: (id: number | string, type: TrashTypes, cb: onChangeListener) => void,
}