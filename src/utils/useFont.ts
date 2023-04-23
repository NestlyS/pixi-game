import { ITextStyle, TextStyle } from 'pixi.js';
import { useMemo } from 'react';
import { COLORS, COMMON_STROKE_THICKNESS, MAIN_FONT_NAME } from '../constants';

type Props = {
  fontFamily?: string;
  fill?: COLORS[] | COLORS;
  stroke?: COLORS;
} & Partial<ITextStyle>;

export const useFont = ({
  fontFamily = MAIN_FONT_NAME,
  fill = [COLORS.Black],
  stroke = COLORS.Black,
  strokeThickness = COMMON_STROKE_THICKNESS,
  ...props
}: Props) => {
  return useMemo(
    () =>
      new TextStyle({
        fontFamily,
        fill: Array.isArray(fill) ? fill : [fill],
        stroke,
        strokeThickness,
        ...props,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fontFamily, fill, stroke],
  );
};
