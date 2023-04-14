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
import { MONSTER_LABEL, SHADOW_FILTER } from '../../constants';
import { AnimationList } from '../controllers/AnimationController/context';

const DEATH_SPEED = 0.07;
const DEATH_TIME = 60 / DEATH_SPEED;
const test = '/monsters/monster.json';
const animationMap = {
  [AnimationList.Idle]: { name: 'stand', speed: 0.07, loop: true, priority: 1 },
  [AnimationList.Run]: { name: 'run', speed: 0.07, loop: true, priority: 2 },
  [AnimationList.Attack]: { name: 'attack', speed: 0.17, loop: false, priority: 3 },
  [AnimationList.Hurt]: { name: 'hurt', speed: 0.03, loop: false, priority: 4 },
  [AnimationList.Die]: { name: 'die', speed: DEATH_SPEED, loop: true, priority: 5 },
  [AnimationList.Fall]: null,
  [AnimationList.Jump]: null,
  [AnimationList.Slide]: null,
};

export const BODY_FRICTION = 0.01;
const MAIN_BODY_OPTIONS = { inertia: Infinity, friction: BODY_FRICTION, weight: 300 };

export type Props = {
  x: number;
  y: number;
  onDeath?: (body?: Matter_Body) => void;
};

export const Monster = ({ x, y, onDeath }: Props) => {
  const monsterLabelRef = useRef(uniqueId(MONSTER_LABEL));

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
          <HealthController initialHealth={1}>
            <DeathListener />
            <AnimatedSpriteController
              width={190}
              height={180}
              spritesheet={test}
              animationSpeed={0.07}
              setDefault
              zIndex={100}
              filters={[SHADOW_FILTER]}
            >
              <AnimationController animationParams={animationMap}>
                <SimpleAIController spritesheetUrl={test} animationName="bullet" />
              </AnimationController>
            </AnimatedSpriteController>
          </HealthController>
        </GroundTouchController>
      </Body>
    </DeathWrapper>
  );
};
