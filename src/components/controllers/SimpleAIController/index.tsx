import { useTick } from "@inlet/react-pixi";
import uniqueId from "lodash.uniqueid";
import { IEventCollision, Engine } from "matter-js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { USER_BODY_GROUP } from "../../../bodyGroups/user";
import { EPS } from "../../../constants";
import { useBody } from "../../Body/context"
import { CleanEventListener } from "../../Body/typing";
import { applyForce } from "../../Body/utils";
import { Bullet } from "../../Bullet";
import { Directions } from "../../Bullet/controller";
import { AttackingAnimationProvider } from "../AttackController/context";
import { ConnectedSensorController } from "../ConntectedSensorController";
import { useDeath } from "../DeathController/context";

const BULLET_WIDTH = 40;
const BULLET_HEIGHT = 40;
const BULLET_SPEED = 5;
const BULLET_TTL = 1000;
const ATTACK_COOLDOWN = 2500;

const DEATH_BOOST = 11;

type BulletProps = {
  id: number | string,
  x: number,
  y: number,
  direction: Directions,
  cb: () => void,
}

type Props = {
  animationName: string,
  spritesheetUrl: string,
  children?: React.ReactNode,
}

export const SimpleAIController = ({
  children,
  spritesheetUrl,
  animationName,
}: Props) => {
  const {
    body,
    onCollision,
    clearCollision
  } = useBody();
  const isDead = useDeath();

  const [isAttack, setIsAttack] = useState(false);
  const isAttackRef = useRef(false);
  const [bullets, setBullets] = useState<BulletProps[]>([]);
  const isCooldownRef = useRef<null | (() => void)>(null);
  const direction = useRef<1|-1>(1);
  const distanseRef = useRef(0);
  const deltaRef = useRef(0);

  useEffect(() => {
    if (isDead && body) applyForce(body, DEATH_BOOST, -DEATH_BOOST);
  }, [body, isDead])

  useEffect(() => {
    if (!body || !onCollision || !clearCollision) return;

    body.position.x += 10 * direction.current;

    const cb: CleanEventListener = e => {
      const isSensorCollision = e.pairs.some(value => value.bodyA.label === 'ai-sensor' || value.bodyB.label === 'ai-sensor');
      if (isSensorCollision) {
        console.log('collision');
        direction.current *= -1;
      }
    }

    onCollision(cb);

    return () => {
      clearCollision(cb);
    }
  }, [body, clearCollision, onCollision])

  useTick(delta => {
    if (!body || isAttack || isDead) return;

    deltaRef.current += delta;

    if (deltaRef.current < 20) return;

    deltaRef.current = 0;

    if (Math.abs(body.velocity.x) > EPS * 50 || distanseRef.current < 50) {
      applyForce(body, 3 * direction.current, body.velocity.y);
    }
  })

  const handleCollision = useCallback(
    (e: IEventCollision<Engine>) => {
      if (isAttackRef.current || isCooldownRef.current || !e.pairs.some(pair => USER_BODY_GROUP.get().some(body => pair.bodyA.label === body.label || pair.bodyB.label === body.label))) return;
      setIsAttack(true);
      const timeoutId = setTimeout(() => isCooldownRef.current = null,ATTACK_COOLDOWN);
      isCooldownRef.current = () => clearTimeout(timeoutId);
      isAttackRef.current = true;
    },
    [],
  );

  const value = useMemo(() => ({
    isAttack,
    onActionFinish: () => {
      setIsAttack(false);
      isAttackRef.current = false;

      if (!body) return;

      const id =  uniqueId();
      const cb = () => setBullets(bullets => bullets.filter(bullet => bullet.id !== id));
      const bullet = {
        id,
        x: body.position.x,
        y: body.position.y,
        direction: direction.current < 0 ? Directions.Left : Directions.Right,
        cb
      }
      setBullets(bullets => [...bullets, bullet]);
    }
  }), [body, isAttack]);

  return (
    <AttackingAnimationProvider value={value}>
      { !isDead && <ConnectedSensorController isHidden={false} width={300} height={100} onCollision={handleCollision} />}
      {children}
      { !isDead && !!bullets.length
          && bullets.map(bullet => (
            <Bullet
              key={bullet.id}
              x={bullet.x}
              y={bullet.y}
              width={BULLET_WIDTH}
              height={BULLET_HEIGHT}
              speed={BULLET_SPEED}
              ttl={BULLET_TTL }
              direction={bullet.direction}
              onDelete={bullet.cb}
              spritesheet={spritesheetUrl}
              animationName={animationName}
            />
          ))}
    </AttackingAnimationProvider>
  )
}