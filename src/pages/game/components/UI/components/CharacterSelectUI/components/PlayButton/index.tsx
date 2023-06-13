import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonWithText } from '../../../../../../../../components/ui/ButtonWithText';
import { COLORS } from '../../../../../../../../constants';
import {
  selectAppControllerWidth,
  selectAppControllerHeight,
} from '../../../../../../../../redux/appController/selectors';
import { initGame, setPage } from '../../../../../../../../redux/gamePage';
import { useFont } from '../../../../../../../../utils/useFont';
import { Pages } from '../../../../../../../../redux/gamePage/typings';

const SMALL_FONT_SIZE = 10;
const MENU_SPRITESHEET_URL = 'menuAtlas';
const START_TEXTURE_URL = 'button_play.png';

export const PlayButton = () => {
  const width = useSelector(selectAppControllerWidth);
  const height = useSelector(selectAppControllerHeight);
  const dispatch = useDispatch();

  const onPlay = useCallback(() => {
    dispatch(initGame());
    dispatch(setPage(Pages.Main));
  }, [dispatch]);

  const buttonWidth = width * 0.3;
  const buttonHeight = height * 0.55;
  const fontSize = buttonWidth / SMALL_FONT_SIZE;

  const playBtnFontStyle = useFont({
    fill: COLORS.MainFontFill,
    stroke: COLORS.UIOutline,
    fontSize,
    strokeThickness: fontSize / 7,
  });

  return (
    <ButtonWithText
      onClick={onPlay}
      x={width * 0.35}
      y={height * 0.55}
      width={buttonWidth}
      height={buttonHeight}
      marginLeft={buttonWidth * 0.2}
      marginTop={buttonHeight * 0.3}
      spritesheetUrl={MENU_SPRITESHEET_URL}
      textureUrl={START_TEXTURE_URL}
      fontStyle={playBtnFontStyle}
    >
      Играть
    </ButtonWithText>
  );
};
