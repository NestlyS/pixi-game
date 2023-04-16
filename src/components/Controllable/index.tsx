import uniqueId from 'lodash.uniqueid';
import { useRef } from 'react';
import { Body } from '../Body';
import { AnimatedSpriteController } from '../controllers/AnimatedSpriteController';
import { AnimationController } from '../controllers/AnimationController';
import { AnimationList } from '../controllers/AnimationController/context';
import { DamageTouchController } from '../controllers/DamageTouchController';
import { GroundTouchController } from '../controllers/GroundTouchController';
import { JumpController } from '../controllers/JumpController';
import { MoveController } from '../controllers/MoveController';
import { HealthController } from '../controllers/HealthController';
import { ViewController } from '../controllers/ViewController';
import { SlideController } from '../controllers/SlideController';
import { AttackController } from '../controllers/AttackController';
import { USER_BODY_GROUP } from '../../bodyGroups/user';
import { MainUserController } from '../MainUserStorage/controller';
import { BLACK_OUTLINE_FILTER, SHADOW_FILTER, USER_LABEL } from '../../constants';
import { FallController } from '../controllers/FallController';
import { ResetUserController } from '../controllers/ResetUserController';
import { DeathListener } from '../controllers/DeathController/listener';
import { MainUserDeathWrapper } from '../controllers/MainUserDeathWrapper';
import { HealController } from '../controllers/HealController';
import { MainUserSpriteDirectionController } from '../controllers/MainUserSpriteDirectionController';

const test = '/eva/eva.json';
const animationMap = {
  [AnimationList.Idle]: { name: 'expectation', speed: 0.07, loop: true, priority: 1 },
  [AnimationList.Run]: { name: 'run', speed: 0.07, loop: true, priority: 2 },
  [AnimationList.Slide]: { name: 'sliding', speed: 0.07, loop: true, priority: 3 },
  [AnimationList.Fall]: { name: 'fall', speed: 0.07, loop: true, priority: 4 },
  [AnimationList.Heal]: { name: 'heal', speed: 0.15, loop: false, priority: 5 },
  [AnimationList.Jump]: { name: 'jump', speed: 0.09, loop: false, priority: 6 },
  [AnimationList.Attack]: { name: 'attack', speed: 0.15, loop: false, priority: 7 },
  [AnimationList.Hurt]: { name: 'hurt', speed: 0.05, loop: true, priority: 8 },
  [AnimationList.Die]: {
    name: 'death',
    speed: 0.1,
    loop: false,
    priority: 9,
    filters: [BLACK_OUTLINE_FILTER],
  },
};

const MAX_HEALTH = 3;
export const USER_COOLDOWN = 700;
export const BODY_FRICTION = 0.05;
const HEAL_COOLDOWN_VALUE = 30 * 1000;
const MAIN_BODY_OPTIONS = { inertia: Infinity, friction: BODY_FRICTION, weight: 300 };
const INVICIBILITY_PERIOD = 2000;

type Props = {
  x: number;
  y: number;
};

export const ControllableBody = ({ x, y }: Props) => {
  const userLabelRef = useRef(uniqueId(USER_LABEL));

  return (
    <Body
      x={x}
      y={y}
      width={50}
      height={120}
      options={MAIN_BODY_OPTIONS}
      label={userLabelRef.current}
      bodyGroup={USER_BODY_GROUP}
    >
      <MainUserController maxHealth={MAX_HEALTH} />
      <GroundTouchController>
        <AnimatedSpriteController
          ignoreRotation
          width={190}
          height={180}
          spritesheet={test}
          animationSpeed={0.07}
          setDefault
          zIndex={100}
          filters={[SHADOW_FILTER]}
        >
          <AnimationController animationParams={animationMap}>
            <MainUserSpriteDirectionController />
            <MainUserDeathWrapper>
              <MoveController />
              <JumpController />
              <FallController />
              <HealController cooldown={HEAL_COOLDOWN_VALUE} />
              <HealthController
                initialHealth={MAX_HEALTH}
                maxHealth={MAX_HEALTH}
                cooldown={INVICIBILITY_PERIOD}
              />
              <DeathListener />
              <ResetUserController x={x} y={y} />
              <AttackController width={70} height={100} cooldown={USER_COOLDOWN}>
                <ViewController />
                <DamageTouchController />
                <SlideController />
              </AttackController>
            </MainUserDeathWrapper>
          </AnimationController>
        </AnimatedSpriteController>
      </GroundTouchController>
    </Body>
  );
};
