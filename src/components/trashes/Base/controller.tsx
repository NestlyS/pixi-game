import { useTick } from '@pixi/react';
import { useSelector } from 'react-redux';
import { Body, Vector } from 'matter-js';
import { useRef } from 'react';
import { useBody } from '../../Body/context';
import { selectPageGamePauseState } from '../../../redux/gamePage/selectors';
import { useSlowerTick } from '../../../utils/useSlowedTick';

type Props = {
  amplitude: number;
  isTouched: boolean;
  onDelete?: () => void;
};

const DELTA = 2;

export const TrashBodyController = ({ amplitude, isTouched, onDelete }: Props) => {
  const { body } = useBody();
  const bodyStartPosRef = useRef<Vector | null>(null);
  const directionRef = useRef<-1 | 1 | -10>(1);
  const bodyAmplitudeRef = useRef<number>(0);
  const isPaused = useSelector(selectPageGamePauseState);

  useSlowerTick(() => {
    if (!body || isPaused) return;

    if (bodyStartPosRef.current === null) bodyStartPosRef.current = { ...body.position };

    if (isTouched) directionRef.current += -1.5;
    if (isTouched && body.position.y < bodyStartPosRef.current.y - 1000) return onDelete?.();

    if (!isTouched && bodyAmplitudeRef.current > amplitude) {
      directionRef.current *= -1;
      bodyAmplitudeRef.current = 0;
    }

    Body.setPosition(body, { x: body.position.x, y: body.position.y + 1 * directionRef.current });
    Body.setAngle(body, body.angle + 0.03 * directionRef.current);

    bodyAmplitudeRef.current += 1;
  }, DELTA);

  return null;
};
