import React, { useCallback, useEffect, useRef, useState } from 'react';
import { _ReactPixi, Text } from '@pixi/react';
import { SignalList, useCatchSignal } from '../../../../utils/signaller/emitSignal';

type Props = {
  text: string;
  interval: number;
  onNextChar: (restChars: string[]) => void;
} & _ReactPixi.IText;

export const LazyText = ({ text: initialText, interval = 0, onNextChar, ...textProps }: Props) => {
  const [text, setText] = useState('');
  const restText = useRef(initialText.split(''));
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const updateText = useCallback(() => {
    onNextChar(restText.current);

    if (!restText.current.length) {
      return;
    }

    setText((val) => val + restText.current.splice(0, 1));
    timeoutIdRef.current = setTimeout(updateText, interval);
  }, [interval, onNextChar]);

  useEffect(() => {
    restText.current = initialText.split('');
    setText('');

    updateText();
    return () => {
      timeoutIdRef.current && clearTimeout(timeoutIdRef.current);
    };
  }, [initialText, updateText]);

  const onSkip = useCallback(() => {
    const rest = restText.current;
    restText.current = [];
    setText((val) => val + rest.join(''));
    onNextChar([]);
  }, [onNextChar]);

  useCatchSignal(SignalList.lazyBoxSkip, onSkip);

  return <Text text={text} {...textProps} />;
};
