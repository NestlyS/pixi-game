import { Body } from 'matter-js';
import { Container } from 'pixi.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useControlKey } from '../../../utils/useControlKey';
import { useBody } from '../../Body/context';
import { BODY_FRICTION } from '../../Controllable';
import { AnimationList, useAnimationController } from '../AnimationController/context';
import { useAttackingAnimation } from '../AttackController/context';
import { useGroundTouch } from '../GroundTouchController/context';
import { useContainer } from '../ViewController/context';
import { SLIDE_KEY_CODE, SLIDE_KEY_CODE_EXTRA } from '../../../constants';

export const SLIDING_FRICTION = 0.001;

/**
 * Из-за того, что спрайт не может корректно определить свое расположение относительно пола,
 *  мы ему с этим помогаем, сдвигая на самую узкую часть объекта.
 * Когда требуется вернуться в обратное положение, мы сдвигаем объект опираясь на уже записанное значение о
 *  его положении. Это может помочь избежать ситуаций, когда спрайт уедет прочь после нескольких итераций сдвиганий
 * Мне вообще не нравится это решение, но пока что оно самое очевидное.
 */
const { moveSpriteCenter, returnSpriteCenter } = (() => {
  let prevValue = { x: 0, y: 0 };

  return {
    moveSpriteCenter: (container: Container, offset: number) => {
      prevValue = { x: container.pivot.x, y: container.pivot.y };

      container.pivot.set(prevValue.x, offset);
    },
    returnSpriteCenter: (container: Container) => {
      container.pivot.set(prevValue.x, prevValue.y);
    },
  };
})();

export const SlideController = () => {
  const { body } = useBody();
  const isAttack = useAttackingAnimation();
  const isGroundTouchedRef = useRef(false);
  const onChange = useCallback((isTouched: boolean) => {
    isGroundTouchedRef.current = isTouched;
  }, []);

  const { requestAnimation, releaseAnimation } = useAnimationController();

  const container = useContainer<Container>();
  useGroundTouch(onChange);

  const [isSliding, setSliding] = useState(false);
  const slidingRef = useRef(false);

  const isUnsladed = isAttack;

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

    moveSpriteCenter(container, bodyWidth * 0.2);
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

  useControlKey(SLIDE_KEY_CODE, SCb, unpressCb);
  useControlKey(SLIDE_KEY_CODE_EXTRA, SCb, unpressCb);

  useEffect(() => {
    if (isUnsladed && slidingRef.current) unpressCb();
  }, [isUnsladed, unpressCb]);

  useEffect(() => {
    if (isSliding) {
      requestAnimation({ name: AnimationList.Slide });
      return;
    }

    releaseAnimation(AnimationList.Slide);
  }, [isSliding, releaseAnimation, requestAnimation]);

  return null;
};
