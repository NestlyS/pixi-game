import { ease } from 'pixi-ease';
import { Container, Text } from '@pixi/react';
import React, { useRef, useEffect } from 'react';
import { Text as ReactPixiText } from 'pixi.js';

import { COLORS } from '../../../../../../constants';
import { useMounted } from '../../../../../../utils/useMounted';
import { useFont } from '../../../../../../utils/useFont';
import { useSelector } from 'react-redux';
import { selectAppControllerWidth } from '../../../../../../redux/appController/selectors';

const DEFAULT_ANCHOR = { x: 0.5, y: 0 };
const MAX_ALPHA = 0.5;
const CHANGE_COLOR_SPEED = 1500;
const START_TEXT = '[Нажмите любую клавишу]';

type Props = {
  x: number;
  y: number;
  anchor?: { x: number; y: number };
};

export const AnimatedText = React.memo(({ x, y, anchor = DEFAULT_ANCHOR }: Props) => {
  const screenWidth = useSelector(selectAppControllerWidth);
  const isMounted = useMounted();
  const ref = useRef<ReactPixiText | null>(null);

  useEffect(() => {
    if (!isMounted) return;

    let timeoutId: NodeJS.Timeout | null = null;

    const animate = (alpha: number) => {
      if (!ref.current) return;

      const generic = ease.add(ref.current, { alpha }, { duration: 100, ease: 'linear' });
      generic.once('complete', () => {
        timeoutId = setTimeout(() => {
          animate(alpha === 0 ? MAX_ALPHA : 0);
        }, CHANGE_COLOR_SPEED);
      });
    };

    animate(MAX_ALPHA);

    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [isMounted]);

  const fontSize = screenWidth * 0.03;

  const fontStyle = useFont({
    fill: [COLORS.MainFontFill],
    stroke: COLORS.MainFontOutline,
    fontSize,
    strokeThickness: fontSize * 0.15,
    letterSpacing: fontSize * 0.1,
  });

  const whiteFontStyle = useFont({
    fill: [COLORS.White],
    stroke: COLORS.White,
    fontSize,
    strokeThickness: fontSize * 0.15,
    letterSpacing: fontSize * 0.1,
  });

  return (
    <Container x={x} y={y}>
      <Text x={0} y={0} text={START_TEXT} style={fontStyle} anchor={anchor} />
      <Text
        x={0}
        y={0}
        alpha={0}
        text={START_TEXT}
        style={whiteFontStyle}
        anchor={anchor}
        ref={ref}
      />
    </Container>
  );
});
