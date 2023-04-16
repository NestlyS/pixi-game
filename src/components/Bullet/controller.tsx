import { useTick } from '@pixi/react';
import { Body } from 'matter-js';
import { useEffect, useRef } from 'react';
import { useBody } from '../Body/context';

export enum Directions {
  Up = 'up',
  UpRight = 'up-right',
  Right = 'right',
  RightDown = 'right-down',
  Down = 'down',
  DownLeft = 'down-left',
  Left = 'left',
  LeftUp = 'left-up',
}

const getDirectionMultiplier = (direction: Directions): { x: number; y: number } => {
  switch (direction) {
    case Directions.Up:
      return { x: 0, y: -1 };
    case Directions.UpRight:
      return { x: 1, y: -1 };
    case Directions.Right:
      return { x: 1, y: 0 };
    case Directions.RightDown:
      return { x: 1, y: 1 };
    case Directions.Down:
      return { x: 0, y: 1 };
    case Directions.DownLeft:
      return { x: -1, y: 1 };
    case Directions.Left:
      return { x: -1, y: 0 };
    case Directions.LeftUp:
      return { x: -1, y: -1 };
  }
};

type Props = {
  direction: Directions;
  speed: number;
  setCurrentDistance: (distance: number) => void;
};

export const BulletController = ({ direction, speed, setCurrentDistance }: Props) => {
  const { body } = useBody();
  const deltaRef = useRef(0);
  const distanceRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    distanceRef.current = { x: body.position.x, y: body.position.y };

    return () => {
      distanceRef.current = { x: 0, y: 0 };
    };
  }, [body]);

  useTick((delta) => {
    deltaRef.current += delta;

    if (deltaRef.current < 10) return;
    deltaRef.current = 0;

    const distance = Math.sqrt(
      Math.pow(body.position.x - distanceRef.current.x, 2) -
        Math.pow(body.position.y - distanceRef.current.y, 2),
    );

    const { x: xMult, y: yMult } = getDirectionMultiplier(direction);

    Body.setVelocity(body, {
      x: speed * xMult,
      y: speed * yMult,
    });

    setCurrentDistance(distance);
  });

  return null;
};
