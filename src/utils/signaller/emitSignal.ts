import { useEffect } from 'react';

export enum SignalList {
  Reset = 'reset-signal',
  GameOver = 'game-over',
  KeyDown = 'keydown',
  KeyUp = 'keyup',
  lazyBoxSkip = 'lazyBoxSkip',
}

export const emitSignal = (signalName: SignalList) => {
  const event = new Event(signalName);
  document.body.dispatchEvent(event);
};

export const emitKeyboardSignal = (
  signalName: SignalList.KeyDown | SignalList.KeyUp,
  extraOptions?: KeyboardEventInit,
) => {
  const event = new KeyboardEvent(signalName, { ...extraOptions, bubbles: true });
  document.body.dispatchEvent(event);
};

export const useCatchSignal = (signalName: SignalList, cb: () => void) => {
  useEffect(() => {
    document.body.addEventListener(signalName, cb);

    return () => document.body.removeEventListener(signalName, cb);
  }, [cb, signalName]);
};
