import uniqueId from 'lodash.uniqueid';
import { Body as Matter_Body } from 'matter-js';
import { Body } from '../Body';
import { AnimatedSpriteController } from '../controllers/AnimatedSpriteController';
import { AnimationController } from '../controllers/AnimationController';
import { GroundTouchController } from '../controllers/GroundTouchController';
import { HealthController } from '../controllers/HealthController';
import { SimpleAIController } from '../controllers/SimpleAIController';
import { DAMAGABLE_BODY_GROUP } from '../../bodyGroups/damagable';
import { DAMAGING_BODY_GROUP } from '../../bodyGroups/damaging';
import { DeathWrapper } from '../controllers/DeathController/wrapper';
import { DeathListener } from '../controllers/DeathController/listener';
import { useRef } from 'react';
import { Filters, MONSTER_LABEL } from '../../constants';
import { AnimationList } from '../controllers/AnimationController/context';

const AFTER_ATTACK_COOLDOWN = 1000;
const DEATH_SPEED = 0.07;
const DEATH_TIME = 60 / DEATH_SPEED;
const test = '/monsters/monster.json';
const animationMap = {
  [AnimationList.Idle]: { name: 'stand', speed: 0.07, loop: true, priority: 1 },
  [AnimationList.Run]: { name: 'run', speed: 0.07, loop: true, priority: 2 },
  [AnimationList.Attack]: { name: 'attack', speed: 0.15, loop: false, priority: 3 },
  [AnimationList.Hurt]: { name: 'hurt', speed: 0.03, loop: false, priority: 4 },
  [AnimationList.Die]: { name: 'die', speed: DEATH_SPEED, loop: true, priority: 5 },
  [AnimationList.Fall]: null,
  [AnimationList.Jump]: null,
  [AnimationList.Slide]: null,
};

const FILTERS = [Filters.SHADOW_FILTER];
export const BODY_FRICTION = 0.01;
const MONSTER_HEALTH = 1;
const MAIN_BODY_OPTIONS = { inertia: Infinity, friction: BODY_FRICTION, weight: 300 };

export type Props = {
  x: number;
  y: number;
  onDeath?: (body?: Matter_Body) => void;
  isMovingDisabled?: boolean;
  isShootingDisabled?: boolean;
};

export const Monster = ({ x, y, onDeath, isMovingDisabled, isShootingDisabled }: Props) => {
  const monsterLabelRef = useRef(uniqueId(MONSTER_LABEL));
  console.log('monster', x, y);

  return (
    <DeathWrapper cooldown={DEATH_TIME} onDeath={onDeath}>
      <Body
        x={x}
        y={y}
        width={120}
        height={120}
        options={MAIN_BODY_OPTIONS}
        label={monsterLabelRef.current}
        bodyGroup={[DAMAGABLE_BODY_GROUP, DAMAGING_BODY_GROUP]}
      >
        <GroundTouchController>
          <HealthController initialHealth={MONSTER_HEALTH} maxHealth={MONSTER_HEALTH} />
          <DeathListener />
          <AnimatedSpriteController
            width={190}
            height={180}
            spritesheet={test}
            animationSpeed={0.07}
            setDefault
            zIndex={100}
            filters={FILTERS}
          >
            <AnimationController animationParams={animationMap}>
              <SimpleAIController
                afterAttackCooldown={AFTER_ATTACK_COOLDOWN}
                spritesheetUrl={test}
                animationName="bullet"
                isMovingDisabled={isMovingDisabled}
                isShootingDisabled={isShootingDisabled}
              />
            </AnimationController>
          </AnimatedSpriteController>
        </GroundTouchController>
      </Body>
    </DeathWrapper>
  );
};
