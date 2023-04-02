import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Filter } from 'pixi.js';
import { useAnimation } from '../../AnimatedSprite/context';
import { AnimationControllerProvider, AnimationList, AnimationState } from './context';

type AnimationParams = {
  name: string;
  speed?: number;
  loop?: boolean;
  priority: number;
  filters?: Filter[];
};
type AnimationRecord<T extends string = string> = Record<T, AnimationParams | null>;

type Props = {
  animationParams: { [AnimationList.Idle]: AnimationParams } & Partial<
    AnimationRecord<AnimationList>
  >;
  children: React.ReactNode;
};

export const AnimationController = ({ animationParams, children }: Props) => {
  const { animations, onComplete, setAnimation } = useAnimation();

  const animationStack = useRef<[name: AnimationList, priority: number][]>([
    [AnimationList.Idle, animationParams[AnimationList.Idle].priority],
  ]);

  const refreshAnimations = useCallback(() => {
    if (!animationStack.current[0][0]) return;

    const topAnimationParams = animationParams[animationStack.current[0][0]];

    if (!topAnimationParams) {
      console.error('Нет анимаций для отображения. Стек пуст');
      return;
    }

    console.log({ ...animationStack.current }, topAnimationParams);

    setAnimation({
      name: topAnimationParams.name,
      loop: topAnimationParams.loop,
      speed: topAnimationParams.speed,
      _filters: topAnimationParams.filters,
    });
  }, [animationParams, setAnimation]);

  useEffect(() => refreshAnimations(), []);

  const requestAnimation = useCallback<AnimationState['requestAnimation']>(
    ({ name, onFinish }) => {
      console.log(animations, name, animationParams);

      if (!animationParams[name]?.name || !animations.includes(animationParams[name]?.name ?? '')) {
        console.error('Для данного имени нет анимаций.');
        return;
      }

      const animationParam = Object.entries(animationParams).find(
        ([animationName]) => animationName === name,
      )?.[1];

      console.log(animationParam, animationParams);

      if (!animationParam) {
        return;
      }

      if (!animationStack.current.some(([animationName]) => animationName === name)) {
        animationStack.current.push([name, animationParam.priority]);
        // Сортировка в восходящем порядке, так у нас всегда элемент на первом месте
        animationStack.current.sort(([, priorA], [, priorB]) => priorB - priorA);
      }

      refreshAnimations();
      if (onFinish) onComplete(onFinish, true);
    },
    [animationParams, animations, onComplete, refreshAnimations],
  );

  const releaseAnimation = useCallback<AnimationState['releaseAnimation']>(
    (name) => {
      console.log(...animationStack.current);
      animationStack.current = animationStack.current.filter(
        ([animationName]) => animationName !== name,
      );
      console.log(...animationStack.current);
      refreshAnimations();
    },
    [refreshAnimations],
  );

  const value = useMemo(
    () => ({
      requestAnimation,
      releaseAnimation,
    }),
    [releaseAnimation, requestAnimation],
  );

  return <AnimationControllerProvider value={value}>{children}</AnimationControllerProvider>;
};
