import { useTick } from '@inlet/react-pixi';
import { Bodies, Body as Matter_Body, Composite, Engine, Events, IChamferableBodyDefinition } from 'matter-js';
import React, { Ref, useEffect, useMemo, useRef, useState } from 'react';
import { useEngine } from '../../utils/useEngine';
import { RectangleController } from '../controllers/RectangleGraphicsController';
import { useSettings } from '../Settings/context';
import { BodyStateContextProvider } from './context';
import { checkIsBodyInPairs } from './utils';

const IS_DEV = true;

export type ControllerProps = {
  x: number,
  y: number,
  rotation: number,
  body: Matter_Body | null,
}

type Props = {
  x?: number;
  y?: number;
  rotation?: number;
  width: number;
  height: number;
  options?: IChamferableBodyDefinition;
  children?: JSX.Element | React.ReactNode | React.ReactElement | React.ReactElement[] | null;
  onCollision?: (e: Matter.IEventCollision<Matter.Engine>) => void;
}


export const Body: React.FC<Props> = React.memo(({
  x: initialX = 0,
  y: initialY = 0,
  rotation: initialRotation = 0,
  width: initialWidth,
  height: initialHeight,
  options,
  children,
  onCollision,
}) => {
  const bodyRef = useRef<Matter_Body | null>(null);

  const engine = useEngine();
  const [ x, setX ] = useState(initialX);
  const [ y, setY ] = useState(initialY);
  const [ vx, setVX ] = useState(0);
  const [ vy, setVY ] = useState(0);
  const [ rotation, setRotation ] = useState(initialRotation);

  const {
    isCollisionVisible
  } = useSettings();

  useEffect(() => {
    if (!engine) return;

    const body = Bodies.rectangle(initialX, initialY, initialWidth, initialHeight, { angle: initialRotation, ...options });
    Composite.add(engine.world, [body]);
    bodyRef.current = body;
  // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => {
      Composite.remove(engine.world, body);
      bodyRef.current = null;
      console.log('DESTROY');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine, initialHeight, initialWidth]);

  useEffect(() => {
    if (!bodyRef.current || !options) {
      return;
    }

    if (options.friction) {
      bodyRef.current.friction = options.friction;
    }
  }, [options]);

  useEffect(() => {
    if (!bodyRef.current) return;

    Matter_Body.setPosition(bodyRef.current, {x: initialX, y: initialY});
    setX(+bodyRef.current.position.x.toFixed(3));
    setY(+bodyRef.current.position.y.toFixed(3));
  }, [initialX, initialY]);

  useEffect(() => {
    if (!engine || !onCollision || !bodyRef.current) return;

    Events.on(engine, 'collisionStart', (e) => {
      // Проверка, что одно из тел - это текущее тело
      if (!checkIsBodyInPairs(e.pairs, bodyRef.current)) return;

      const cleanEvent = { ...e, pairs: e.pairs.filter(pair => pair.bodyA === bodyRef.current || pair.bodyB === bodyRef.current) }

      console.log('collisionStart');

      onCollision(cleanEvent);
    });
  }, [engine, onCollision]);

  useTick(() => {
    if (!bodyRef.current) {
      return;
    }

    if (x !== +bodyRef.current.position.x.toFixed(3) || y !== +bodyRef.current.position.y.toFixed(3) || rotation !== +bodyRef.current.angle.toFixed(3) || vx !== +bodyRef.current.velocity.x.toFixed(3) || vy !== +bodyRef.current.velocity.y.toFixed(3)) {
      setX(+bodyRef.current.position.x.toFixed(3));
      setY(+bodyRef.current.position.y.toFixed(3));
      setVX(+bodyRef.current.velocity.x.toFixed(3));
      setVY(+bodyRef.current.velocity.y.toFixed(3));
      setRotation(+bodyRef.current.angle.toFixed(3));
    }
  });

  const value = useMemo(() => ({
    x,
    y,
    vx,
    vy,
    rotation,
    body: bodyRef.current,
  }), [rotation, vx, vy, x, y]);

  return (
    <BodyStateContextProvider value={value}>
      {children}
      {isCollisionVisible ? <RectangleController width={initialWidth} height={initialHeight} /> : null}
    </BodyStateContextProvider>
  );
});
