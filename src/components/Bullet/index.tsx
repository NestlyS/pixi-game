import uniqueId from 'lodash.uniqueid';
import { useCallback, useMemo, useRef, useState } from 'react';
import { DAMAGABLE_BODY_GROUP } from '../../bodyGroups/damagable';
import { BodyGroupMap } from '../../bodyGroups/typings';
import { UNGRAVITY_BODY_GROUP } from '../../bodyGroups/ungravity';
import { USER_BODY_GROUP } from '../../bodyGroups/user';
import { Body } from '../Body';
import { AnimatedSpriteController } from '../controllers/AnimatedSpriteController';
import { isUserSensorLabel } from '../controllers/ConntectedSensorController/utils';
import { SpriteController } from '../controllers/SpriteController';
import { useHealth } from '../HealthStorage/context';
import { getBodyId } from '../HealthStorage/utils';
import { BulletController, Directions } from './controller';

const getDirectionRotation = (direction: Directions): number => {
  switch (direction) {
    case Directions.Up:
      return 4.71;
    case Directions.UpRight:
      return 3.93;
    case Directions.Right:
      return 3.14;
    case Directions.RightDown:
      return 2.36;
    case Directions.Down:
      return 1.57;
    case Directions.DownLeft:
      return 0.79;
    case Directions.Left:
      return 0;
    case Directions.LeftUp:
      return 5.5;
  }
};

const DAMAGE_VALUE = 1;
const BULLET_PARAMS: Matter.IChamferableBodyDefinition = {
  isSensor: true,
};

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
  damagingBodyGroup?: BodyGroupMap;
  onDelete?: () => void;
};

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
  damagingBodyGroup = USER_BODY_GROUP,
  onDelete,
}: Props) => {
  const { setHealth } = useHealth();
  const bodyLabelRef = useRef(uniqueId('bullet'));
  const [innerDirection, setInnerDirection] = useState(direction);
  const [innerTTL, setInnerTTL] = useState(ttl);
  const [innerSpeed, setInnerSpped] = useState(speed);
  const damagingBodyGroupRef = useRef(damagingBodyGroup);

  const onCollision = useCallback(
    (e: Matter.IEventCollision<Matter.Engine>) => {
      const attackSensorLabelPair = e.pairs.find(
        (pair) => isUserSensorLabel(pair.bodyA) || isUserSensorLabel(pair.bodyB),
      );

      if (attackSensorLabelPair) {
        damagingBodyGroupRef.current = DAMAGABLE_BODY_GROUP;
        setInnerDirection(Directions.Right);
        setInnerTTL((innerttl) => innerttl * 2);
        setInnerSpped((innerSpd) => innerSpd * 2);

        return;
      }

      const userBodyPair = e.pairs.find((pair) =>
        damagingBodyGroupRef.current
          .get()
          .some((body) => pair.bodyA.label === body.label || pair.bodyB.label === body.label),
      );
      if (!userBodyPair) return;
      const collidedUser =
        userBodyPair.bodyA.label === bodyLabelRef.current ? userBodyPair.bodyB : userBodyPair.bodyA;

      setHealth((value) => (value ? value - DAMAGE_VALUE : value), getBodyId(collidedUser));
      onDelete?.();
    },
    [onDelete, setHealth],
  );

  const setCurrentDistance = useCallback(
    (distance: number) => {
      if (distance > innerTTL) onDelete?.();
    },
    [onDelete, innerTTL],
  );

  const rotation = useMemo(() => getDirectionRotation(innerDirection), [innerDirection]);

  if (!textureUrl && !animationName) return null;

  return (
    <Body
      width={width}
      height={height}
      x={x}
      y={y}
      onCollision={onCollision}
      options={BULLET_PARAMS}
      label={bodyLabelRef.current}
      rotation={rotation}
      bodyGroup={[UNGRAVITY_BODY_GROUP]}
    >
      <BulletController
        direction={innerDirection}
        speed={innerSpeed}
        setCurrentDistance={setCurrentDistance}
      />
      <>
        {textureUrl && (
          <SpriteController
            width={width * 1.5}
            height={height * 1.5}
            textureUrl={textureUrl}
            spritesheet={spritesheet}
            rotation={rotation}
          />
        )}
        {animationName && (
          <AnimatedSpriteController
            width={width * 1.5}
            height={height * 1.5}
            spritesheet={spritesheet}
            initialAnimation={animationName}
            animationSpeed={0.3}
            zIndex={10}
            ignoreRotation
            rotation={rotation}
          />
        )}
      </>
    </Body>
  );
};
