import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectAppControllerWidth,
  selectAppControllerHeight,
} from '../../../../../../../../redux/appController/selectors';
import { FullscreenRect, HoleType } from '../../../../../../../../components/ui/FullscreenRect';
import { COLORS, GLOBAL_HIT_AREA } from '../../../../../../../../constants';
import { Container, Text } from '@pixi/react';
import { useFont } from '../../../../../../../../utils/useFont';

const TEXT_ANCHOR = { x: 0.5, y: 0.5 };

type Props = {
  text: string;
  textPosition: 'left' | 'right' | 'middle';
  textWidth: number;
  hole?: HoleType;
  onClick: () => void;
};

const getFontX = (textPosition: 'left' | 'right' | 'middle') => {
  switch (textPosition) {
    case 'left':
      return 0.2;
    case 'middle':
      return 0.5;
    case 'right':
      return 0.85;
    default:
      return 0.5;
  }
};

export const TutorialOnScreen = ({ text, textPosition, textWidth, hole, onClick }: Props) => {
  const screenWidth = useSelector(selectAppControllerWidth);
  const screenHeight = useSelector(selectAppControllerHeight);

  const isMiddleScreenText = textPosition === 'middle';

  const fontSize = screenWidth * (textPosition === 'middle' ? 0.03 : 0.017);
  const fontBlockWidth = screenWidth * textWidth;
  const fontX = screenWidth * getFontX(textPosition);
  const fontY = screenHeight * 0.5;

  const modifiedHole: HoleType | undefined = useMemo(() => {
    if (!hole) return undefined;

    return {
      x: hole.x * screenWidth,
      y: hole.y * screenHeight,
      width: hole.width * screenWidth,
      height: hole.height * screenHeight,
      withLine: hole.withLine,
    };
  }, [hole, screenHeight, screenWidth]);

  const style = useFont({
    fill: [COLORS.White],
    fontSize,
    wordWrap: true,
    wordWrapWidth: fontBlockWidth,
    align: isMiddleScreenText ? 'center' : 'left',
  });

  return (
    <Container
      onpointerdown={onClick}
      interactive
      interactiveChildren={false}
      hitArea={GLOBAL_HIT_AREA}
    >
      <FullscreenRect color={COLORS.Black} hole={modifiedHole} alpha={0.6} />
      <Text x={fontX} y={fontY} text={text} style={style} anchor={TEXT_ANCHOR} />
    </Container>
  );
};
