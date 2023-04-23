import { AnimatedSprite as ReactPIXIAnimatedSprite, useApp } from '@pixi/react';
import {
  AnimatedSprite as PIXI_AnimatedSprite,
  Texture,
  IPointData,
  SCALE_MODES,
  Spritesheet,
  Filter,
} from 'pixi.js';
import { Assets } from '@pixi/assets';
import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AnimationContextProvider, AnimationState } from './context';
import { selectPageGamePauseState } from '../../redux/gamePage/selectors';

export type IAnimatedSprite = {
  spritesheet: string;
  children?: React.ReactNode;
  x?: number;
  y?: number;
  anchor?: IPointData;
  initialAnimation?: string;
  width: number;
  height: number;
  rotation?: number;
  setDefault?: boolean;
  scale?: IPointData;
  animationSpeed?: number;
  zIndex?: number;
  filters?: Filter[];
  onComplete?: (currentAnimationName: string | null) => void;
};

export const AnimatedSprite = memo(
  forwardRef<PIXI_AnimatedSprite, IAnimatedSprite>(
    (
      {
        spritesheet,
        width,
        height,
        rotation,
        x,
        y,
        scale,
        children,
        anchor,
        initialAnimation,
        animationSpeed: initialAnimationSpeed = 1,
        setDefault,
        zIndex,
        filters: initialFilters,
        onComplete,
      },
      ref,
    ) => {
      const [currentAnimation, setCurrentAnimation] = useState<Texture[]>([]);
      const currentAnimationNameRef = useRef<string | null>(null);
      const [animationMap, setAnimationMap] = useState<Record<string, Texture[]>>({});
      const [animationSpeed, setAnimationSpeed] = useState<number>(initialAnimationSpeed);
      const onCompleteListenersRef = useRef<
        [(currentAnimationName: string | null) => void, boolean][]
      >([]);
      const [isLooped, setIsLooped] = useState<boolean>(true);
      const [filters, setFilters] = useState<Filter[]>([]);
      const app = useApp();
      const isPaused = useSelector(selectPageGamePauseState);

      // load
      useEffect(() => {
        const processSpritesheet = (loadedSpritesheet?: Spritesheet) => {
          if (!loadedSpritesheet?.animations) {
            throw new Error('Не обнаружено анимаций');
          }

          const animationMapRaw = Object.entries(loadedSpritesheet.animations).reduce(
            (acc, [animationName, frameUrls]) => {
              const textures = frameUrls.map((texture) => {
                texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

                return texture;
              });

              acc[animationName] = textures;

              return acc;
            },
            {} as Record<string, Texture[]>,
          );

          setAnimationMap(animationMapRaw);

          if (setDefault || initialAnimation) {
            setCurrentAnimation(
              initialAnimation
                ? animationMapRaw[initialAnimation]
                : Object.values(animationMapRaw)[0],
            );
            currentAnimationNameRef.current = initialAnimation || Object.keys(animationMapRaw)[0];
          }
        };

        if (Assets.cache.has(spritesheet)) {
          const spritesheetData = Assets.cache.get<Spritesheet>(spritesheet);
          return processSpritesheet(spritesheetData);
        }

        const cb = async () => {
          let loadedSpritesheet = null;
          if (Assets.cache.has(spritesheet)) {
            loadedSpritesheet = Assets.cache.get<Spritesheet>(spritesheet);
          } else {
            loadedSpritesheet = await Assets.load<Spritesheet>(spritesheet);
          }
          return processSpritesheet(loadedSpritesheet);
        };

        cb();
      }, [app, initialAnimation, setDefault, spritesheet]);

      const onComplete_ = useCallback(
        (cb: (currentAnimationName: string | null) => void, once = false) =>
          onCompleteListenersRef.current.push([cb, once]),
        [],
      );
      const clearOnComplete_ = useCallback(
        (cb: (currentAnimationName: string | null) => void) =>
          onCompleteListenersRef.current.filter(([_cb]) => cb !== _cb),
        [],
      );
      const innerOnComplete = useCallback(() => {
        onComplete?.(currentAnimationNameRef.current);
        onCompleteListenersRef.current = onCompleteListenersRef.current.filter(([cb, once]) => {
          cb(currentAnimationNameRef.current);
          return !once;
        });
      }, [onComplete]);

      const setAnimation = useCallback(
        ({
          name,
          loop,
          speed,
          _filters,
        }: {
          name: string;
          loop?: boolean | undefined;
          speed?: number | undefined;
          _filters?: Filter[] | undefined;
        }) => {
          setCurrentAnimation(animationMap[name]);
          currentAnimationNameRef.current = name;

          if (loop !== undefined) setIsLooped(loop);
          if (speed !== undefined) setAnimationSpeed(speed);
          setFilters(_filters ?? []);

          if (!ref || typeof ref === 'function') return;
          if (!isPaused) ref.current?.play();
          setCurrentAnimation(animationMap[name]);
        },
        [animationMap, isPaused, ref],
      );

      useEffect(() => {
        if (!ref || typeof ref === 'function') return;

        if (isPaused) {
          ref.current?.stop();
          return;
        }

        ref.current?.play();
      }, [isPaused, currentAnimation, ref]);

      const value = useMemo(
        () =>
          ({
            setAnimation,
            onComplete: onComplete_,
            clearOnComplete: clearOnComplete_,
            animations: Object.keys(animationMap),
          } as AnimationState),
        [animationMap, clearOnComplete_, onComplete_, setAnimation],
      );

      if (!currentAnimation?.length) {
        return null;
      }

      return (
        <>
          <ReactPIXIAnimatedSprite
            x={x}
            y={y}
            onLoop={innerOnComplete}
            onComplete={innerOnComplete}
            animationSpeed={animationSpeed}
            isPlaying={true}
            rotation={rotation}
            textures={currentAnimation}
            anchor={anchor}
            width={width}
            ref={ref}
            height={height}
            loop={isLooped}
            zIndex={zIndex}
            filters={[...(initialFilters ?? []), ...filters]}
            {...(scale ? { scale } : {})}
          />
          <AnimationContextProvider value={value}>{children}</AnimationContextProvider>
        </>
      );
    },
  ),
);
