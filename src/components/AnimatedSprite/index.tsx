import {
  AnimatedSprite as ReactPIXIAnimatedSprite,
  Container,
  useApp,
  _ReactPixi,
} from '@inlet/react-pixi';
import {
  Application,
  ISpritesheetData,
  AnimatedSprite as PIXI_AnimatedSprite,
  Texture,
  IPointData,
  Container as PIXI_Container,
  SCALE_MODES,
} from 'pixi.js';
import React, {
  forwardRef,
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { loadData } from '../../utils/asyncPIXILoader';
import { AnimationContextProvider, AnimationState } from './context';

export type IAnimatedSprite = {
  spritesheet: string;
  children?: React.ReactElement | React.ReactElement[];
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
  onComplete?: (currentAnimationName: string | null) => void;
};

export const AnimatedSprite = memo(
  forwardRef<PIXI_Container<PIXI_AnimatedSprite>, IAnimatedSprite>(
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
      const app = useApp();

      // load
      useEffect(() => {
        if (!app?.loader) {
          return;
        }

        const cb = async () => {
          let loadedSpritesheet = app.loader.resources[spritesheet]
            ? (app.loader.resources[spritesheet].data as ISpritesheetData)
            : await loadData<ISpritesheetData>(spritesheet, app);
          console.log('spritesheet', spritesheet, app.loader.resources, loadedSpritesheet);

          console.log(
            'ANIMATION!!!- ---- -- -- -',
            loadedSpritesheet,
            initialAnimation,
            setDefault,
          );
          if (!loadedSpritesheet.animations) {
            throw new Error('Не обнаружено анимаций');
          }

          const animationMapRaw = Object.entries(loadedSpritesheet.animations).reduce(
            (acc, [animationName, frameUrls]) => {
              const textures = frameUrls
                .map((frameUrl) => Texture.from(frameUrl))
                .map((texture) => {
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

        cb();
      }, [app, initialAnimation, setDefault, spritesheet]);

      const onComplete_ = useCallback(
        (cb: (currentAnimationName: string | null) => void, once: boolean = false) =>
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
        }: {
          name: string;
          loop?: boolean | undefined;
          speed?: number | undefined;
        }) => {
          setCurrentAnimation(animationMap[name]);
          currentAnimationNameRef.current = name;

          if (loop !== undefined) setIsLooped(loop);
          if (speed !== undefined) setAnimationSpeed(speed);

          console.log(name, ref);

          (
            ref as MutableRefObject<PIXI_Container<PIXI_AnimatedSprite> | null>
          )?.current?.children[0].play();
        },
        [animationMap, ref],
      );

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
          {/* @ts-ignore */}
          <Container
            ref={ref}
            x={x}
            y={y}
            rotation={rotation}
            width={width}
            height={height}
            zIndex={5}
          >
            <ReactPIXIAnimatedSprite
              onLoop={innerOnComplete}
              onComplete={innerOnComplete}
              animationSpeed={animationSpeed}
              isPlaying={true}
              textures={currentAnimation}
              anchor={anchor}
              width={width}
              loop={isLooped}
              height={height}
              zIndex={zIndex}
              {...(scale ? { scale } : {})}
            />
          </Container>
          <AnimationContextProvider value={value}>{children}</AnimationContextProvider>
        </>
      );
    },
  ),
);
