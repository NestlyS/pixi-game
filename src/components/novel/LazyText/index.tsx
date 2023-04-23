import React, { useEffect } from 'react';
import { _ReactPixi, Text } from '@pixi/react';
import { useControlKey } from '../../../utils/useControlKey';
import { SKIP_KEY_CODE } from '../../../constants';

type Props = {
  text: string;
  restText: string;
  interval: number;
  onNextChar: () => void;
  onSkip: () => void;
} & _ReactPixi.IText;

export const LazyText = ({
  text,
  restText,
  interval = 0,
  onNextChar,
  onSkip,
  ...textProps
}: Props) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const update = () => {
      if (!restText.length) return;
      onNextChar();
      timeoutId = setTimeout(update, interval);
    };

    timeoutId = setTimeout(update, interval);
    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [interval, restText]);

  useControlKey(SKIP_KEY_CODE, onSkip);

  return <Text text={text} {...textProps} />;
};
