import { useSelector } from 'react-redux';
import { ButtonJump } from './components/ButtonJump';
import { ButtonSlide } from './components/ButtonSlide';
import { ButtonAttack } from './components/ButtonAttack';
import { ButtonHeal } from './components/ButtonHeal';
import {
  selectAppControllerWidth,
  selectAppControllerHeight,
} from '../../../../../../../../redux/appController/selectors';

export const Controls = () => {
  const screenWidth = useSelector(selectAppControllerWidth);
  const screenHeight = useSelector(selectAppControllerHeight);

  return (
    <>
      <ButtonJump y={screenHeight * 0.8} x={screenWidth * 0.06} />
      <ButtonSlide y={screenHeight * 0.8} x={screenWidth * 0.18} />
      <ButtonAttack y={screenHeight * 0.8} x={screenWidth * 0.75} />
      <ButtonHeal y={screenHeight * 0.8} x={screenWidth * 0.87} />
    </>
  );
};
