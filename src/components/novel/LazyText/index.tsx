import React, { useCallback, useEffect, useRef, useState } from 'react';
import { _ReactPixi, Text } from '@pixi/react';
import { useControlKey } from '../../../utils/useControlKey';
import { SKIP_KEY_CODE } from '../../../constants';

const textChars = (text: string) => text.split('').concat([...Array(10)].map(() => ''));

type Props = {
  text: string;
  interval: number;
} & _ReactPixi.IText;

export const LazyText = ({ text, interval = 0, ...textProps }: Props) => {
  const [state, setState] = useState('');
  const restTextRef = useRef(textChars(text));

  useEffect(() => {
    const update = () => {
      if (restTextRef.current.length === 0) return;
      setState((text) => text + restTextRef.current.shift());
      setTimeout(update, interval);
    };

    const i = setTimeout(update, interval);
    return () => clearTimeout(i);
  }, [interval, text]);

  const cb = useCallback(() => {
    if (restTextRef.current.length === 0) return;

    setState((text) => {
      const newText = text + restTextRef.current.join('');
      restTextRef.current = [];
      return newText;
    });
  }, []);

  useControlKey(SKIP_KEY_CODE, cb);

  return <Text text={state} {...textProps} />;
};
