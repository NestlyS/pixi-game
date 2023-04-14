import { useTick } from '@pixi/react';
import { Detector, Body, Collision } from 'matter-js';
import { useEffect, useRef, useState } from 'react';
import { BodyGroupMap } from '../bodyGroups/typings';

export const UPDATE_PERIOD = 15;

type Props = {
  body: Body | null;
  bodyGroup: BodyGroupMap;
  initialState?: boolean;
};

export const useBodyToBodyGroupCollisionDetect = ({
  body,
  bodyGroup,
  initialState = false,
}: Props): [boolean, Collision[]] => {
  const [isCollided, setCollision] = useState(initialState);
  const deltaRef = useRef(0);
  const detectorRef = useRef(Detector.create());
  const collisionsRef = useRef<Collision[]>([]);

  useEffect(() => {
    if (!body) return;

    const cb = () => {
      Detector.setBodies(detectorRef.current, [...bodyGroup.get(), body]);
    };

    cb();
    bodyGroup.addOnChangeListener(cb);

    return () => {
      bodyGroup.removeOnChangeListener(cb);
    };
  }, [body, bodyGroup]);

  useTick((delta) => {
    deltaRef.current += delta;

    if (deltaRef.current < UPDATE_PERIOD || !body) return;

    deltaRef.current = 0;

    // Возможно для получения урона стоит переписать события под Event
    const bodyToCompositeCollisions = Detector.collisions(detectorRef.current).filter(
      (collision) => collision.bodyA === body || collision.bodyB === body,
    );
    const isColliding = bodyToCompositeCollisions.some((collision) => collision.collided);

    if (isColliding !== isCollided) {
      collisionsRef.current = bodyToCompositeCollisions;
      setCollision(isColliding);
    }
  });

  return [isCollided, collisionsRef.current];
};
