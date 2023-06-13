import { useCallback, useState } from 'react';
import { Container, Text } from '@pixi/react';
import { useSelector } from 'react-redux';

import { ScreenTransition } from '../../../../components/ui/ScreenTransition';
import { COLORS, GLOBAL_HIT_AREA, JUMP_KEY_CODE_1 } from '../../../../constants';
import { useFont } from '../../../../utils/useFont';
import { selectAppControllerWidth } from '../../../../redux/appController/selectors';
import { useControlKey2 } from '../../../../utils/useControlKey';

const FONT_ANCHOR = { x: 0.5, y: 0 };
const DURATION = 700;
const NEXT_PAGE_BUTTON = 'Нажмите любую клавишу';

type Props = {
  text: string;
  isActive?: boolean;
  onNextPage: () => void;
  onComplete?: () => void;
};

export const ScreenTransitionWithTextUI = ({
  text,
  isActive,
  onComplete: _onComplete,
  onNextPage,
}: Props) => {
  const screenWidth = useSelector(selectAppControllerWidth);
  const screenHeight = useSelector(selectAppControllerWidth);
  const [animationCompleted, setAnimationCompleteState] = useState(!isActive);

  if (isActive === true && animationCompleted === true) {
    setAnimationCompleteState(false);
  }

  const onTextClick = useCallback(() => {
    onNextPage();
  }, [onNextPage]);

  const onComplete = useCallback(() => {
    setAnimationCompleteState(true);
    _onComplete?.();
  }, [_onComplete]);

  useControlKey2(JUMP_KEY_CODE_1, onTextClick);

  const fontStyle = useFont({
    fill: [COLORS.White],
    fontSize: screenWidth * 0.02,
    wordWrap: true,
    wordWrapWidth: screenWidth * 0.8,
    breakWords: true,
    align: 'center',
  });

  const spaceStyle = useFont({
    fill: [COLORS.White],
    fontSize: screenWidth * 0.015,
  });

  if (!isActive && animationCompleted) return null;

  return (
    <Container
      onpointertap={onTextClick}
      interactive
      interactiveChildren={false}
      hitArea={GLOBAL_HIT_AREA}
    >
      {isActive && (
        <ScreenTransition alpha={0} color={COLORS.Black} toAlpha={1} duration={DURATION} />
      )}
      {isActive && (
        <Text
          x={screenWidth / 2}
          y={screenHeight * 0.25}
          text={text}
          style={fontStyle}
          anchor={FONT_ANCHOR}
        />
      )}
      {isActive && (
        <Text
          x={screenWidth * 0.8}
          y={screenHeight * 0.5}
          text={NEXT_PAGE_BUTTON}
          style={spaceStyle}
          anchor={FONT_ANCHOR}
        />
      )}
      {!isActive && (
        <ScreenTransition
          color={COLORS.Black}
          alpha={1}
          toAlpha={0}
          duration={DURATION}
          onComplete={onComplete}
        />
      )}
    </Container>
  );
};
