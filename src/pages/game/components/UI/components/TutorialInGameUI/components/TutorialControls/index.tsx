import { useSelector } from 'react-redux';
import {
  selectAppControllerWidth,
  selectAppControllerHeight,
} from '../../../../../../../../redux/appController/selectors';
import { ButtonAttack } from '../../../InGameUI/components/Controls/components/ButtonAttack';
import { ButtonJump } from '../../../InGameUI/components/Controls/components/ButtonJump';
import { ButtonSlide } from '../../../InGameUI/components/Controls/components/ButtonSlide';
import { Filters, UI_SPRITESHEET_URL } from '../../../../../../../../constants';
import { Sprite } from '../../../../../../../../components/Sprite';

const HEAL_BUTTON = 'icon_heal.png';

export const TutorialControls = () => {
  const screenWidth = useSelector(selectAppControllerWidth);
  const screenHeight = useSelector(selectAppControllerHeight);

  const buttonWidth = screenWidth * 0.1;
  const leftButtonBlockStart = screenWidth * 0.06;
  const leftButtonBlockEnd = screenWidth * 0.18;
  const rightButtonBlockStart = screenWidth * 0.75;

  return (
    <>
      <ButtonJump y={screenHeight * 0.8} x={leftButtonBlockStart} />
      <ButtonSlide y={screenHeight * 0.8} x={leftButtonBlockEnd} />
      <ButtonAttack y={screenHeight * 0.8} x={rightButtonBlockStart} />
      <Sprite
        y={screenHeight * 0.8}
        x={screenWidth * 0.87}
        spritesheet={UI_SPRITESHEET_URL}
        textureUrl={HEAL_BUTTON}
        width={buttonWidth}
        height={buttonWidth}
        filters={Filters.COLOR_OVERLAY_FILTER_STEP_0}
      />
    </>
  );
};
