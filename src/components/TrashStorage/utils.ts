import { TrashMap, TrashTypes } from "./typings";

export const initTrash = () => (['bottle', 'chips', 'paper'] as TrashTypes[]).reduce((acc, type) => {acc[type] = { value: 0, listeners: []}; return acc}, {} as TrashMap);