import { Body } from "matter-js"

export type BodyGroupMap = {
  name: string,
  get: () => Body[],
  set: (body: Body) => void,
  delete: (body: Body | Body['id']) => void,
  addOnChangeListener: (cb: onChangeCallback) => void,
  removeOnChangeListener: (cb: onChangeCallback) => void,
}

export type onChangeCallback = (type: 'add' | 'remove', touchedBody: Body) => void;