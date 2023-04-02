import { useTick } from '@pixi/react';
import { Body, Vector } from 'matter-js';
import { useRef } from 'react';
import { useBody } from '../../Body/context';
import { usePausedState } from '../../ui/Settings/context';

type Props = {
  amplitude: number;
  isTouched: boolean;
  onDelete?: () => void;
};

export const TrashBodyController = ({ amplitude, isTouched, onDelete }: Props) => {
  const { body } = useBody();
  const bodyStartPosRef = useRef<Vector | null>(null);
  const directionRef = useRef<-1 | 1 | -10>(1);
  const bodyAmplitudeRef = useRef<number>(0);
  const deltaRef = useRef(0);
  const isPaused = usePausedState();

  useTick((delta) => {
    if (!body) return;

    deltaRef.current += delta;

    if (!isPaused && !isTouched && deltaRef.current < 3) return;

    deltaRef.current = 0;

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
  });

  return null;
};
