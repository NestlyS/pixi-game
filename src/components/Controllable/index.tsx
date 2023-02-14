import uniqueId from 'lodash.uniqueid';
import { Body } from '../Body';
import { AnimatedSpriteController } from '../controllers/AnimatedSpriteController';
import { AnimationController } from '../controllers/AnimationController';
import { DamageTouchController } from '../controllers/DamageTouchController';
import { GroundTouchController } from '../controllers/GroundTouchController';
import { JumpController } from '../controllers/JumpController';
import { MoveController } from '../controllers/MoveController';
import { HealthController } from '../controllers/HealthController';
import { ViewController } from '../controllers/ViewController';
import { SlideController } from '../controllers/SlideController';
import { AttackController } from '../controllers/AttackController';
import { USER_BODY_GROUP } from '../../bodyGroups/user';
import { useRef } from 'react';
import { MainUserController } from '../MainUserStorage/controller';

const test = '/eva/eva.json';
const animationMap = {
  Idle: { name: 'stand', speed: 0.07, loop: true },
  Run: { name: 'run', speed: 0.07, loop: true },
  Fall: { name: 'fall', speed: 0.07, loop: true },
  Jump: { name: 'jump', speed: 0.09, loop: false },
  Hurt: { name: 'hurt', speed: 0.07, loop: true },
  Slide: { name: 'slide', speed: 0.07, loop: true },
  Attack: { name: 'attack', speed: 0.15, loop: false, trigger: true },
  Die: undefined,
};

export const BODY_FRICTION = 0.05;
const MAIN_BODY_OPTIONS = { inertia: Infinity, friction: BODY_FRICTION, weight: 300 };
const INVICIBILITY_PERIOD = 1000;

export const ControllableBody = () => {
  const userLabelRef = useRef(uniqueId('user'));

  return (
    <Body
      x={800}
      y={0}
      width={50}
      height={120}
      options={MAIN_BODY_OPTIONS}
      label={userLabelRef.current}
      bodyGroup={USER_BODY_GROUP}
    >
      <MainUserController />
      <GroundTouchController>
        <MoveController />
        <JumpController />
        <ViewController />
        <HealthController
          initialHealth={3}
          bodyId={userLabelRef.current}
          cooldown={INVICIBILITY_PERIOD}
        >
          <AttackController width={70} height={100}>
            <AnimatedSpriteController
              ignoreRotation
              width={190}
              height={180}
              spritesheet={test}
              animationSpeed={0.07}
              setDefault
              zIndex={100}
            >
              <ViewController />
              <DamageTouchController />
              <SlideController>
                <AnimationController animationNames={animationMap} />
              </SlideController>
            </AnimatedSpriteController>
          </AttackController>
        </HealthController>
      </GroundTouchController>
    </Body>
  );
};
