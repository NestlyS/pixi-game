import { useTick } from "@inlet/react-pixi";
import { useState, useEffect, useRef, useMemo } from "react";
import uniqueId from 'lodash.uniqueid';


type StoreDataType = {
  isPressed: boolean,
  isInited: boolean,
  callback: null | (() => void);
}
const INPUT_CHECK = 1;
const KEYS_STORE: Record<KeyboardEvent['key'], StoreDataType> = {};

const chechIsCorrectCode = (e: KeyboardEvent, key: KeyboardEvent['code']) => e.code !== key;

export const useGlobalCheck = () => {

  const timer = useRef(0);

  useTick(delta => {
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
}

export const useControlKey = (key: KeyboardEvent['code'], cb: () => void, onUnpress?: () => void): void => {
  const uniqKey = useMemo(() => uniqueId(key), [key]);

  useEffect(() => {
    KEYS_STORE[uniqKey] = { isPressed: false, isInited: false, callback: cb};

    const downCb = (e: KeyboardEvent) => {
      if (chechIsCorrectCode(e, key)) {
        return;
      }

      KEYS_STORE[uniqKey].isPressed = true;
      KEYS_STORE[uniqKey].isInited = true;
    };

    const upCb = (e: KeyboardEvent) => {
      if (chechIsCorrectCode(e, key)) {
        return;
      }

      const unpressCb = () => {
        KEYS_STORE[uniqKey].isPressed = false;
        onUnpress?.();
      }

      if (KEYS_STORE[uniqKey].isInited) {
        const prevCb = KEYS_STORE[uniqKey].callback;
        KEYS_STORE[uniqKey].callback = () => { prevCb?.(); unpressCb(); KEYS_STORE[uniqKey].callback = prevCb;}
        KEYS_STORE[uniqKey].isInited = false;

        return;
      }

      unpressCb();
    };

    window.addEventListener('keydown', downCb);
    window.addEventListener('keyup', upCb);

    return () => {
      KEYS_STORE[uniqKey] = { isPressed: false, isInited: false, callback: null };
      window.removeEventListener('keydown', downCb);
      window.removeEventListener('keyup', upCb);
    }
  }, [cb, uniqKey, key, onUnpress]);
}