import { useTick } from '@inlet/react-pixi';
import { useState, useEffect, useRef, useMemo } from 'react';
import uniqueId from 'lodash.uniqueid';

type StoreDataType = {
  isPressed: boolean;
  isInited: boolean;
  callback: null | (() => void);
};
const INPUT_CHECK = 1;
const KEYS_STORE: Record<KeyboardEvent['key'], StoreDataType> = {};

const chechIsCorrectCode = (e: KeyboardEvent, key: KeyboardEvent['code']) => e.code !== key;

export const useGlobalCheck = () => {
  const timer = useRef(0);

  useTick((delta) => {
    timer.current += delta;

    if (timer.current > INPUT_CHECK) {
      Object.entries(KEYS_STORE).forEach(([key, { isPressed, callback }]) => {
        if (isPressed && callback) {
          callback();
          KEYS_STORE[key].isInited = false;
        }
      });

      timer.current = 0;
    }
  });
};

const keyboardCheck = (key: KeyboardEvent['code'], cb: () => void) => (e: KeyboardEvent) => {
  if (chechIsCorrectCode(e, key)) return;

  cb();
};

export const useControlKey = (
  key: KeyboardEvent['code'] | 'mouse',
  cb: () => void,
  onUnpress?: () => void,
): void => {
  const uniqKey = useMemo(() => uniqueId(key), [key]);

  useEffect(() => {
    KEYS_STORE[uniqKey] = { isPressed: false, isInited: false, callback: cb };

    const downCb = () => {
      KEYS_STORE[uniqKey].isPressed = true;
      KEYS_STORE[uniqKey].isInited = true;
    };

    const upCb = () => {
      const unpressCb = () => {
        KEYS_STORE[uniqKey].isPressed = false;
        onUnpress?.();
      };

      if (KEYS_STORE[uniqKey].isInited) {
        const prevCb = KEYS_STORE[uniqKey].callback;
        KEYS_STORE[uniqKey].callback = () => {
          prevCb?.();
          unpressCb();
          KEYS_STORE[uniqKey].callback = prevCb;
        };
        KEYS_STORE[uniqKey].isInited = false;

        return;
      }

      unpressCb();
    };

    // TODO Исправить any
    const clearFunc = (_downCb: (e: any) => void, _upCb: (e: any) => void) => () => {
      console.log('CLEAR', uniqKey, KEYS_STORE[uniqKey]);
      KEYS_STORE[uniqKey] = { isPressed: false, isInited: false, callback: null };
      window.removeEventListener(key === 'mouse' ? 'keydown' : 'mousedown', _downCb);
      window.removeEventListener(key === 'mouse' ? 'keyup' : 'mouseup', _upCb);
    };

    if (key === 'mouse') {
      window.addEventListener('mousedown', downCb);
      window.addEventListener('mouseup', upCb);

      return clearFunc(downCb, upCb);
    }

    const keyboardDownCb = keyboardCheck(key, downCb);
    const keyboardUpCb = keyboardCheck(key, upCb);

    window.addEventListener('keydown', keyboardDownCb);
    window.addEventListener('keyup', keyboardUpCb);

    return clearFunc(keyboardDownCb, keyboardUpCb);
  }, [cb, uniqKey, key, onUnpress]);
};
