import { Body } from 'matter-js';
import { BodyGroupMap, onChangeCallback } from './typings';

export const createBodyGroup = (name: string): BodyGroupMap => {
  let bodies: Body[] = [];
  let callbacks: onChangeCallback[] = [];

  return {
    name,
    set: (body) => {
      if (!body) return;

      bodies.push(body);
      callbacks.map((cb) => cb('add', body));
    },
    delete: (body) => {
      if (!body) return;

      const bodyId = typeof body === 'number' ? body : body.id;
      const deletableBody = bodies.find(({ id }) => id === bodyId);

      if (!deletableBody) return;

      bodies = bodies.filter(({ id }) => id !== deletableBody.id);
      callbacks.map((cb) => cb('remove', deletableBody));
    },
    get: () => [...bodies],
    addOnChangeListener: (newCb) => (callbacks = [...callbacks, newCb]),
    removeOnChangeListener: (newCb) =>
      (callbacks = callbacks.filter((callback) => callback !== newCb)),
  };
};
