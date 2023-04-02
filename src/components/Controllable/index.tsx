import uniqueId from 'lodash.uniqueid';
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
import { useRef } from 'react';
import { MainUserController } from '../MainUserStorage/controller';
import { USER_LABEL } from '../../constants';
import { FallController } from '../controllers/FallController';
import { ResetUserController } from '../controllers/ResetUserController';
import { DeathListener } from '../controllers/DeathController/listener';
import { MainUserDeathWrapper } from '../controllers/MainUserDeathWrapper';
import { OutlineFilter } from 'pixi-filters';

const BLACK_OUTLINE_FILTER = new OutlineFilter(4, 0x251059, 0.05);
const test = '/eva/eva.json';
const animationMap = {
  [AnimationList.Idle]: { name: 'expectation', speed: 0.07, loop: true, priority: 1 },
  [AnimationList.Run]: { name: 'run', speed: 0.07, loop: true, priority: 2 },
  [AnimationList.Slide]: { name: 'sliding', speed: 0.07, loop: true, priority: 3 },
  [AnimationList.Fall]: { name: 'fall', speed: 0.07, loop: true, priority: 4 },
  [AnimationList.Jump]: { name: 'jump', speed: 0.09, loop: false, priority: 5 },
  [AnimationList.Attack]: { name: 'attack', speed: 0.15, loop: false, priority: 6 },
  [AnimationList.Hurt]: { name: 'hurt', speed: 0.05, loop: true, priority: 7 },
  [AnimationList.Die]: {
    name: 'death',
    speed: 0.1,
    loop: false,
    priority: 8,
    filters: [BLACK_OUTLINE_FILTER],
  },
};

export const BODY_FRICTION = 0.05;
const MAIN_BODY_OPTIONS = { inertia: Infinity, friction: BODY_FRICTION, weight: 300 };
const INVICIBILITY_PERIOD = 1000;

export const ControllableBody = () => {
  const userLabelRef = useRef(uniqueId(USER_LABEL));

  return (
    <Body
      x={500}
      y={0}
      width={50}
      height={120}
      options={MAIN_BODY_OPTIONS}
      label={userLabelRef.current}
      bodyGroup={USER_BODY_GROUP}
    >
      <MainUserController />
      <GroundTouchController>
        <AnimatedSpriteController
          ignoreRotation
          width={190}
          height={180}
          spritesheet={test}
          animationSpeed={0.07}
          setDefault
          zIndex={100}
        >
          <AnimationController animationParams={animationMap}>
            <MainUserDeathWrapper>
              <MoveController />
              <JumpController />
              <FallController />
              <HealthController initialHealth={3} cooldown={INVICIBILITY_PERIOD}>
                <DeathListener />
                <ResetUserController x={500} y={0} />
                <AttackController width={70} height={100}>
                  <ViewController />
                  <DamageTouchController />
                  <SlideController />
                </AttackController>
              </HealthController>
            </MainUserDeathWrapper>
          </AnimationController>
        </AnimatedSpriteController>
      </GroundTouchController>
    </Body>
  );
};
