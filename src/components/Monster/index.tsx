import uniqueId from 'lodash.uniqueid';
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

export const MONSTER_LABEL = uniqueId('monster');
const DEATH_SPEED = 0.07;
const DEATH_TIME = 60 / DEATH_SPEED;
const test = '/monsters/monster.json';
const animationMap = {
  Idle: { name: 'stand', speed: 0.07, loop: true },
  Run: { name: 'run', speed: 0.07, loop: true },
  Hurt: { name: 'hurt', speed: 0.03, loop: false },
  Attack: { name: 'attack', speed: 0.17, loop: false, trigger: true },
  Die: { name: 'die', speed: DEATH_SPEED, loop: true },
  Jump: undefined,
  Slide: undefined,
  Fall: undefined,
};

export const BODY_FRICTION = 0.01;
const MAIN_BODY_OPTIONS = { inertia: Infinity, friction: BODY_FRICTION, weight: 300 };

type Props = {
  x: number;
  y: number;
};

export const Monster = ({ x, y }: Props) => {
  return (
    <DeathWrapper cooldown={DEATH_TIME}>
      <Body
        x={x}
        y={y}
        width={120}
        height={120}
        options={MAIN_BODY_OPTIONS}
        label={MONSTER_LABEL}
        bodyGroup={[DAMAGABLE_BODY_GROUP, DAMAGING_BODY_GROUP]}
      >
        <SimpleAIController spritesheetUrl={test} animationName="bullet">
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
              >
                <AnimationController animationNames={animationMap} />
              </AnimatedSpriteController>
            </HealthController>
          </GroundTouchController>
        </SimpleAIController>
      </Body>
    </DeathWrapper>
  );
};
