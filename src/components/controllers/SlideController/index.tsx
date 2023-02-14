import { Body } from 'matter-js';
import { Container } from 'pixi.js';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useControlKey } from '../../../utils/useControlKey';
import { useBody, useBodyParams } from '../../Body/context';
import { BODY_FRICTION } from '../../Controllable';
import { useAttacking, useAttackingAnimation } from '../AttackController/context';
import { useGroundTouch } from '../GroundTouchController/context';
import { useBodyHealth } from '../HealthController/context';
import { useContainer } from '../ViewController/context';
import { initialState, SlidingContextProvider } from './context';

export const SLIDING_FRICTION = 0.001;

/**
 * Из-за того, что спрайт не может корректно определить свое расположение относительно пола,
 *  мы ему с этим помогаем, сдвигая на самую узкую часть объекта.
 * Когда требуется вернуться в обратное положение, мы сдвигаем объект опираясь на уже записанное значение о
 *  его положении. Это может помочь избежать ситуаций, когда спрайт уедет прочь после нескольких итераций сдвиганий
 * Мне вообще не нравится это решение, но пока что оно самое очевидное.
 */
const { moveSpriteCenter, returnSpriteCenter } = (() => {
  let prevValue: number = 0;

  return {
    moveSpriteCenter: (container: Container, offset: number, isBack: boolean) => {
      prevValue = container.children[0].position.y;

      container.children[0].position.y -= offset;
    },
    returnSpriteCenter: (container: Container) => {
      container.children[0].position.y = prevValue;
    },
  };
})();

type Props = {
  children: React.ReactNode;
};

export const SlideController = ({ children }: Props) => {
  const { body } = useBody();
  const { isCooldown } = useBodyHealth();
  const { isAttack } = useAttackingAnimation();
  const isGroundTouchedRef = useRef(false);
  const onChange = useCallback((isTouched: boolean) => {
    isGroundTouchedRef.current = isTouched;
  }, []);

  const container = useContainer<Container>();
  useGroundTouch(onChange);

  const [isSliding, setSliding] = useState(initialState);
  const slidingRef = useRef(initialState);

  const isUnsladed = isCooldown || isAttack;

  const SCb = useCallback(() => {
    if (
      !body ||
      !container?.children ||
      !isGroundTouchedRef.current ||
      slidingRef.current ||
      isUnsladed
    )
      return;
    const bodyWidth = body.bounds.max.x - body.bounds.min.x;
    const bodyNewY = body.bounds.max.y - bodyWidth / 2;

    slidingRef.current = true;

    moveSpriteCenter(container, bodyWidth * 0.6, false);
    Body.setAngle(body, 1.5708);
    Body.setPosition(body, { x: body.position.x, y: bodyNewY });
    Body.setInertia(body, Infinity);
    body.friction = SLIDING_FRICTION;

    setSliding(true);
  }, [body, container, isUnsladed]);

  const unpressCb = useCallback(() => {
    if (!body || !container?.children || !slidingRef.current) return;
    slidingRef.current = false;
    setSliding(false);
    const bodyWidth = body.bounds.max.x - body.bounds.min.x;
    const bodyNewY = body.bounds.max.y - bodyWidth / 2;

    returnSpriteCenter(container);
    Body.setAngle(body, 0);
    Body.setPosition(body, { x: body.position.x, y: bodyNewY });
    Body.setInertia(body, Infinity);
    body.friction = BODY_FRICTION;
  }, [body, container]);

  useControlKey('KeyS', SCb, unpressCb);

  useEffect(() => {
    if (isUnsladed && slidingRef.current) unpressCb();
  }, [isUnsladed, unpressCb]);

  return <SlidingContextProvider value={isSliding}>{children}</SlidingContextProvider>;
};
