import uniqueId from "lodash.uniqueid";
import { useCallback, useMemo, useRef } from "react";
import { DAMAGABLE_BODY_GROUP } from "../../bodyGroups/damagable";
import { USER_BODY_GROUP } from "../../bodyGroups/user";
import { Body } from "../Body"
import { AnimatedSpriteController } from "../controllers/AnimatedSpriteController";
import { SpriteController } from "../controllers/SpriteController";
import { useHealth } from "../HealthStorage/context";
import { BulletController, Directions } from "./controller";

const getDirectionRotation = (direction: Directions): number => {
  switch (direction) {
    case Directions.Up: return 4.71;
    case Directions.UpRight: return 3.93;
    case Directions.Right: return 3.14;
    case Directions.RightDown: return 2.36;
    case Directions.Down: return 1.57;
    case Directions.DownLeft: return 0.79;
    case Directions.Left: return 0;
    case Directions.LeftUp: return 5.5;
  }
}

const DAMAGE_VALUE = 1;
const BULLET_PARAMS: Matter.IChamferableBodyDefinition = {
  isStatic: true,
  isSensor: true,
  density: 0,
}

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  spritesheet: string;
  textureUrl?: string;
  animationName?: string;
  direction?: Directions;
  speed?: number;
  ttl?: number;
  onDelete?: () => void,
}

export const Bullet = ({
  x,
  y,
  width,
  height,
  spritesheet,
  textureUrl,
  animationName,
  direction = Directions.Left,
  speed = 1,
  ttl = 50,
  onDelete,
}: Props) => {
  const {
    setHealth
  } = useHealth();
  const bodyLabelRef = useRef(uniqueId('bullet'));

  const onCollision = useCallback((e: Matter.IEventCollision<Matter.Engine>) => {
    const userBodyPair = e.pairs.find(pair => USER_BODY_GROUP.get().some(body => pair.bodyA.label === body.label || pair.bodyB.label === body.label));
    if (!userBodyPair) return;
    const collidedUser = userBodyPair.bodyA.label === bodyLabelRef.current ? userBodyPair.bodyB : userBodyPair.bodyA;

    setHealth(value => value ? value - DAMAGE_VALUE : value, collidedUser.label);
    onDelete?.();
  }, [onDelete, setHealth]);

  const setCurrentDistance = useCallback((distance: number) => {
    if (distance > ttl) onDelete?.();
  }, [onDelete, ttl]);

  const rotation = useMemo(() => getDirectionRotation(direction), [direction]);

  if (!textureUrl && !animationName) return null;

  return (
    <Body width={width} height={height} x={x} y={y} onCollision={onCollision} options={BULLET_PARAMS} label={bodyLabelRef.current} rotation={rotation} bodyGroup={DAMAGABLE_BODY_GROUP}>
      <BulletController direction={direction} speed={speed} setCurrentDistance={setCurrentDistance} />
      <>
        { textureUrl && <SpriteController width={width*1.5} height={height} textureUrl={textureUrl} spritesheet={spritesheet} />}
        { animationName && <AnimatedSpriteController width={width*1.5} height={height} spritesheet={spritesheet} initialAnimation={animationName} animationSpeed={0.3} zIndex={10} /> }
      </>
    </Body>
  )
}