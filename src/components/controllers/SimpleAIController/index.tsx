import { useTick } from '@pixi/react';
import uniqueId from 'lodash.uniqueid';
import { IEventCollision, Engine } from 'matter-js';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { USER_BODY_GROUP } from '../../../bodyGroups/user';
import { AI_SENSOR_LABEL, EPS, MONSTER_LABEL } from '../../../constants';
import { useBody } from '../../Body/context';
import { CleanEventListener } from '../../Body/typing';
import { applyForce } from '../../Body/utils';
import { Bullet } from '../../Bullet';
import { Directions } from '../../Bullet/controller';
import { AnimationList, useAnimationController } from '../AnimationController/context';
import { AttackingAnimationProvider } from '../AttackController/context';
import { ConnectedSensorController } from '../ConntectedSensorController';
import { useDeath } from '../DeathController/context';

const COLLISION_SENSORS = [MONSTER_LABEL, AI_SENSOR_LABEL];
const BULLET_WIDTH = 40;
const BULLET_HEIGHT = 40;
const BULLET_SPEED = 7;
const BULLET_TTL = 1000;
const ATTACK_COOLDOWN = 2500;

const DEATH_BOOST = 11;

type BulletProps = {
  id: number | string;
  x: number;
  y: number;
  direction: Directions;
  cb: () => void;
};

type Props = {
  animationName: string;
  spritesheetUrl: string;
  children?: React.ReactNode;
};

export const SimpleAIController = ({ children, spritesheetUrl, animationName }: Props) => {
  const { body, onCollision, clearCollision } = useBody();
  const { requestAnimation, releaseAnimation } = useAnimationController();
  const isDead = useDeath();

  const isAttackRef = useRef(false);
  const [bullets, setBullets] = useState<BulletProps[]>([]);
  const isCooldownRef = useRef<null | (() => void)>(null);
  const direction = useRef<1 | -1>(1);
  const distanseRef = useRef(0);
  const deltaRef = useRef(0);
  const isRunning = useRef(false);

  useEffect(() => {
    if (isDead && body) {
      applyForce(body, DEATH_BOOST, -DEATH_BOOST);
      requestAnimation({ name: AnimationList.Die });
    }
  }, [body, isDead, requestAnimation]);

  useEffect(() => {
    if (!body || !onCollision || !clearCollision) return;

    body.position.x += 10 * direction.current;

    const cb: CleanEventListener = (e) => {
      const isSensorCollision = e.pairs.some((value) => {
        const testingBody = value.bodyA.label === body.label ? value.bodyB : value.bodyA;

        return COLLISION_SENSORS.some((label) => testingBody.label.includes(label));
      });
      if (isSensorCollision) {
        direction.current *= -1;
      }
    };

    onCollision(cb);

    return () => {
      clearCollision(cb);
    };
  }, [body, clearCollision, onCollision]);

  useTick((delta) => {
    if (!body || isAttackRef.current || isDead) return;

    deltaRef.current += delta;

    if (deltaRef.current < 20) return;

    deltaRef.current = 0;

    if (Math.abs(body.velocity.x) > EPS * 50 || distanseRef.current < 50) {
      applyForce(body, 3 * direction.current, body.velocity.y);
    }

    if (!isRunning.current && Math.abs(body.velocity.x) > EPS * 50) {
      requestAnimation({ name: AnimationList.Run });
      // Код никогда не выставит это в true ну и фиг с ним
      isRunning.current = true;
    }
  });

  const handleCollision = useCallback(
    (e: IEventCollision<Engine>) => {
      if (!body) return;

      if (
        isAttackRef.current ||
        isCooldownRef.current ||
        !e.pairs.some((pair) =>
          USER_BODY_GROUP.get().some(
            (body) => pair.bodyA.label === body.label || pair.bodyB.label === body.label,
          ),
        )
      )
        return;

      const lastDirection = direction.current;

      requestAnimation({
        name: AnimationList.Attack,
        onFinish: () => {
          releaseAnimation(AnimationList.Attack);
          isAttackRef.current = false;

          const id = uniqueId();
          const cb = () => setBullets((bullets) => bullets.filter((bullet) => bullet.id !== id));
          const bullet = {
            id,
            x: body.position.x,
            y: body.position.y,
            direction: lastDirection < 0 ? Directions.Left : Directions.Right,
            cb,
          };
          setBullets((bullets) => [...bullets, bullet]);
        },
      });

      const timeoutId = setTimeout(() => (isCooldownRef.current = null), ATTACK_COOLDOWN);
      isCooldownRef.current = () => clearTimeout(timeoutId);
      isAttackRef.current = true;
    },
    [body, releaseAnimation, requestAnimation],
  );

  return (
    <>
      {!isDead && (
        <ConnectedSensorController
          isHidden={false}
          width={500}
          height={100}
          onCollision={handleCollision}
        />
      )}
      {children}
      {!isDead &&
        !!bullets.length &&
        bullets.map((bullet) => (
          <Bullet
            key={bullet.id}
            x={bullet.x}
            y={bullet.y}
            width={BULLET_WIDTH}
            height={BULLET_HEIGHT}
            speed={BULLET_SPEED}
            ttl={BULLET_TTL}
            direction={bullet.direction}
            onDelete={bullet.cb}
            spritesheet={spritesheetUrl}
            animationName={animationName}
          />
        ))}
    </>
  );
};
