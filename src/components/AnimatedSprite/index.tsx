import { AnimatedSprite as ReactPIXIAnimatedSprite , Container, useApp, _ReactPixi } from "@inlet/react-pixi";
import { Application, ISpritesheetData, AnimatedSprite as PIXI_AnimatedSprite, Texture, IPointData, Container as PIXI_Container, SCALE_MODES } from "pixi.js";
import React, { forwardRef, memo, MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { loadData } from "../../utils/asyncPIXILoader";
import { AnimationContextProvider, AnimationState } from "./context";

export type IAnimatedSprite = {
  spritesheet: string;
  children?: React.ReactElement | React.ReactElement[];
  x?: number;
  y?: number;
  anchor?: IPointData
  width: number;
  height: number;
  rotation?: number;
  setDefault?: boolean;
  scale?: IPointData;
  animationSpeed?: number;
}

export const AnimatedSprite = memo(
  forwardRef<PIXI_Container<PIXI_AnimatedSprite>, IAnimatedSprite>(
    (
      {spritesheet, width, height, rotation, x, y, scale, children, anchor, animationSpeed: initialAnimationSpeed = 1, setDefault},
      ref
    ) => {
    const [currentAnimation, setCurrentAnimation] = useState<Texture[]>([]);
    const [animationMap, setAnimationMap] = useState<Record<string, Texture[]>>({});
    const [animationSpeed, setAnimationSpeed] = useState<number>(initialAnimationSpeed);
    const [isLooped, setIsLooped] = useState<boolean>(true);
    const app = useApp();

    // load
    useEffect(() => {
      if (!app?.loader) {
        return;
      }

      /**
       * TODO Реализовать логику асинхронного добавления в очередь и загрузки спрайтов
       * Возможно потребуется глобальный объект, который будет ответственнен за подгрузку спрайтов
       * Вернуть самолетик для нормального тестирования
       */

      if (app.loader.resources[spritesheet]) {
        return;
      }

      const cb = async () => {
        const loadedSpritesheet = await loadData<ISpritesheetData>(spritesheet, app);

        if (!loadedSpritesheet.animations) {
          throw new Error('Не обнаружено анимаций');
        }

        const animationMapRaw = Object
          .entries(loadedSpritesheet.animations)
          .reduce((acc, [animationName, frameUrls]) => {
            const textures = frameUrls.map(frameUrl => Texture.from(frameUrl)).map(texture => {
              texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

              return texture;
            });

            acc[animationName] = textures;

            return acc;
          }, {} as Record<string, Texture[]>);

        setAnimationMap(animationMapRaw);

        if (setDefault) {
          setCurrentAnimation(Object.values(animationMapRaw)[0])
        }
      }

      cb();
    }, [app, setDefault, spritesheet]);

    const value = useMemo(() => ({
      setAnimation: ({name, loop, speed}) => {
        console.log(name, animationMap)
        setCurrentAnimation(animationMap[name]);

        if (loop !== undefined) setIsLooped(loop);
        if (speed !== undefined) setAnimationSpeed(speed);

        (ref as MutableRefObject<PIXI_Container<PIXI_AnimatedSprite> | null>)?.current?.children[0].play();
      },
      animations: Object.keys(animationMap),
    }) as AnimationState, [animationMap, ref]);

    if (!currentAnimation?.length) {
      return null;
    }

    return (
      <>
        {/* @ts-ignore */}
        <Container ref={ref} x={x} y={y} rotation={rotation} width={width} height={height}>
          <ReactPIXIAnimatedSprite
            animationSpeed={animationSpeed}
            isPlaying={true}
            textures={currentAnimation}
            anchor={anchor}
            width={width}
            loop={isLooped}
            height={height}
            {...(scale ? {scale} : {})}
          />
        </Container>
        <AnimationContextProvider value={value}>
          {children}
        </AnimationContextProvider>
      </>
    );
}));