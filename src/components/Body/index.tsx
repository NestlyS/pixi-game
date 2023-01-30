import { useTick } from '@inlet/react-pixi';
import isEqual from 'lodash/isEqual';
import { Bodies, Body as Matter_Body, Composite, Engine, Events, IChamferableBodyDefinition } from 'matter-js';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BodyGroupMap as BodyGroup } from '../../bodyGroups/typings';
import { useEngine } from '../../utils/useEngine';
import { RectangleController } from '../controllers/RectangleGraphicsController';
import { useSettings } from '../Settings/context';
import { BodyContextProvider, BodyStateContextProvider } from './context';
import { CleanEventListener, CleanEventType } from './typing';
import { checkIsBodyInPairs } from './utils';

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
  label?: string;
  bodyGroup?: BodyGroup | BodyGroup[];
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
  label,
  bodyGroup,
  options,
  children,
  onCollision,
}) => {
  const [body, setBody] = useState<Matter_Body | null>(null);

  const engine = useEngine();
  const [ x, setX ] = useState(initialX);
  const [ y, setY ] = useState(initialY);
  const [ vx, setVX ] = useState(0);
  const [ vy, setVY ] = useState(0);
  const [ rotation, setRotation ] = useState(initialRotation);
  const collisionListentersRef = useRef<CleanEventListener[]>([]);

  const {
    isCollisionVisible
  } = useSettings();

  // ------------------------ INIT --------------------

  useEffect(() => {
    if (!engine) return;
    const rawBody = Bodies.rectangle(initialX, initialY, initialWidth, initialHeight, { angle: initialRotation, ...options });

    Composite.add(engine.world, rawBody);


    if (label) {
      rawBody.label = label;
    }

    setBody(rawBody);

    return () => {
      Composite.remove(engine.world, rawBody);
      setBody(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine]);

  // ------------------ UPDATERS ---------------------------------------------

  useEffect(() => {
    if (!bodyGroup || !body) return;

    const processComposite = (processableBodyGroup: BodyGroup) => processableBodyGroup.set(body);
    const unprocessComposite = (processableBodyGroup: BodyGroup) => processableBodyGroup.delete(body);

    Array.isArray(bodyGroup) ? bodyGroup.map(processComposite) : processComposite(bodyGroup);

    return () => {Array.isArray(bodyGroup) ? bodyGroup.map(unprocessComposite) : unprocessComposite(bodyGroup)};
  }, [body, bodyGroup]);

  useEffect(() => {
    if (!body || !options) {
      return;
    }

    if (options.friction) {
      body.friction = options.friction;
    }
  }, [body, options]);

  useEffect(() => {
    if (!body) return;

    Matter_Body.setPosition(body, {x: initialX, y: initialY});
    setX(+body.position.x.toFixed(3));
    setY(+body.position.y.toFixed(3));
  }, [body, initialX, initialY]);

  useEffect(() => {
    if (!body) return;

    const angle = body.angle;
    const inertia = body.inertia;

    Matter_Body.setAngle(body, 0);

    const width = body.bounds.max.x - body.bounds.min.x;
    const height = body.bounds.max.y - body.bounds.min.y;

    Matter_Body.scale(body, initialWidth / width, initialHeight / height);

    Matter_Body.setAngle(body, angle);
    Matter_Body.setInertia(body, inertia);
  }, [body, initialHeight, initialWidth]);

  useEffect(() => {
    if (!body || !label) return;

    body.label = label;
  }, [body, label]);

// ------------------------------------ ON COLLISION --------------------

  useEffect(() => {
    if (!engine || !body) return;

    const cb = (e: Matter.IEventCollision<Engine>) => {
      // Проверка, что одно из тел - это текущее тело
      if (!checkIsBodyInPairs(e.pairs, body)) return;

      const cleanEvent = { ...e, pairs: e.pairs.filter(pair => pair.bodyA === body || pair.bodyB === body) }


      onCollision?.(cleanEvent);
      collisionListentersRef.current.map(cb => cb(cleanEvent));
    }

    Events.on(engine, 'collisionStart', cb);
    return () => Events.off(engine, 'collisionStart', cb);
  }, [body, engine, onCollision]);

// ------------------------------------ TICK UPDATER ------------------

  useTick((delt) => {
    if (!body) {
      return;
    }

    if (x !== +body.position.x.toFixed(3) || y !== +body.position.y.toFixed(3) || rotation !== +body.angle.toFixed(3) || vx !== +body.velocity.x.toFixed(3) || vy !== +body.velocity.y.toFixed(3)) {
      setX(+body.position.x.toFixed(3));
      setY(+body.position.y.toFixed(3));
      setVX(+body.velocity.x.toFixed(3));
      setVY(+body.velocity.y.toFixed(3));
      setRotation(+body.angle.toFixed(3));
    }
  });

  const subscribeOnCollision = useCallback((cb: CleanEventListener) => { collisionListentersRef.current.push(cb); }, []);
  const clearCollisionSubscription = useCallback((cb: CleanEventListener) => { collisionListentersRef.current = collisionListentersRef.current.filter(listener => listener !== cb); }, []);

  const value = useMemo(() => ({
    x,
    y,
    vx,
    vy,
    rotation,
  }), [rotation, vx, vy, x, y]);

  const bodyValue = useMemo(() => ({
    body,
    onCollision: subscribeOnCollision,
    clearCollision: clearCollisionSubscription
  }), [body, clearCollisionSubscription, subscribeOnCollision]);

  if (!children && !isCollisionVisible) return null;

  return (
    <BodyStateContextProvider value={value}>
      <BodyContextProvider value={bodyValue}>
        {children}
        {isCollisionVisible ? <RectangleController width={initialWidth} height={initialHeight} /> : null}
      </BodyContextProvider>
    </BodyStateContextProvider>
  );
}, ({options, ...prevProps}, {options: newOptions, ...nextProps}) => isEqual(newOptions, options) && isEqual(prevProps, nextProps));
