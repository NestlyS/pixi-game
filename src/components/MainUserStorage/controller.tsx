import { Body } from 'matter-js';
import React, { useCallback, useEffect, useRef } from 'react';
import { SignalList, useCatchSignal } from '../../utils/signaller/emitSignal';
import { useBody } from '../Body/context';
import { useMainUserId } from './context';

export const MainUserController = () => {
  const { body } = useBody();
  const { setId } = useMainUserId();

  useEffect(() => {
    if (!body) return;

    const id = body.label;
    setId(id);
  }, [body, setId]);

  return null;
};
