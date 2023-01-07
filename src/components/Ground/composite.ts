import { Body, Collision, Composite, Events } from "matter-js";

export const GROUND_LABEL = 'ground';
export const GROUND_COMPOSITE = Composite.create({
  label: GROUND_LABEL,
});

type onChangeCallback = (type: 'add' | 'remove') => void;

export const onGroundCompositeChange = (() => {
  let callbacks: onChangeCallback[] = [];

  const cb: onChangeCallback = type => {
    console.log('COMPOSITE_CHANGED', callbacks, GROUND_COMPOSITE.bodies.map(body => body.id));
    callbacks.forEach(callback => callback(type))
  }

  Events.on(GROUND_COMPOSITE, 'afterAdd', () => cb('add'));
  Events.on(GROUND_COMPOSITE, 'afterRemove', () => cb('remove'));

  return {
    add: (newCb: onChangeCallback) => callbacks = [...callbacks, newCb],
    clearCb: (newCb: onChangeCallback) => callbacks = callbacks.filter(callback => callback !== newCb),
  };
})();