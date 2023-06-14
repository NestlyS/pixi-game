import { Container, Text, useTick } from '@pixi/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSettingsFPSCounterVisiblity } from '../../../redux/settings/selectors';
import { useFont } from '../../../utils/useFont';
import { COLORS } from '../../../constants';
import { selectAppControllerWidth } from '../../../redux/appController/selectors';
import { setDefaultGraphicMode, setLowGraphicMode } from '../../../redux/appController';

const FPS_TO_SWITCH_TO_LOW_MODE = 40;
const FAIL_AMOUNT_TO_SWITCH = 5;

type Props = {
  children?: React.ReactNode;
};

export const Settings = ({ children }: Props) => {
  const [fps, setFps] = useState(0);
  const frameCounter = useRef(0);
  const screenWidth = useSelector(selectAppControllerWidth);
  const dispatch = useDispatch();
  // Счетчик количества провалов графики
  const [lowFPSCounter, setLowFPSCount] = useState(0);

  const isFPSCounterVisible = useSelector(selectSettingsFPSCounterVisiblity);

  useEffect(() => {
    const id = setInterval(() => {
      setFps(frameCounter.current);

      if (frameCounter.current < FPS_TO_SWITCH_TO_LOW_MODE) {
        setLowFPSCount((val) => (val >= FAIL_AMOUNT_TO_SWITCH ? val : val + 1));
      }

      if (frameCounter.current >= FPS_TO_SWITCH_TO_LOW_MODE) {
        setLowFPSCount((val) => (val <= -FAIL_AMOUNT_TO_SWITCH ? val : val - 1));
      }

      frameCounter.current = 0;
    }, 1000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Нет смысла проверять FPS, если экран не виден
    if (window.document.visibilityState === 'hidden') return;

    if (lowFPSCounter >= FAIL_AMOUNT_TO_SWITCH) {
      dispatch(setLowGraphicMode());
    }

    /* 
      Если у юзера плохая графика, то зачем делать нормальную?
      if (lowFPSCounter <= -FAIL_AMOUNT_TO_SWITCH) {
      dispatch(setDefaultGraphicMode());
    } */
  }, [dispatch, lowFPSCounter]);

  useTick(() => {
    frameCounter.current += 1;
  });

  const TEXT_STYLE_POSITIVE = useFont({
    fill: [COLORS.TextPositiveFill],
    stroke: COLORS.Black,
    strokeThickness: 5,
    align: 'left',
  });

  const TEXT_STYLE_NEGATIVE = useFont({
    fill: [COLORS.TextNegativeFill],
    stroke: COLORS.Black,
    strokeThickness: 5,
    align: 'left',
  });

  return (
    <>
      {children}
      <Container x={screenWidth * 0.8} width={500} zIndex={100}>
        {isFPSCounterVisible && (
          <Text text={`${fps}`} style={fps > 30 ? TEXT_STYLE_POSITIVE : TEXT_STYLE_NEGATIVE} />
        )}
      </Container>
    </>
  );
};
