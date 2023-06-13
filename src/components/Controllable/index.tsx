import uniqueId from 'lodash.uniqueid';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

import { Body } from '../Body';
import { AnimatedSpriteController } from '../controllers/AnimatedSpriteController';
import { AnimationController } from '../controllers/AnimationController';
import { AnimationList } from '../controllers/AnimationController/context';
import { DamageTouchController } from '../controllers/DamageTouchController';
import { GroundTouchController } from '../controllers/GroundTouchController';
import { JumpController } from '../controllers/mainUserControllers/JumpController';
import { MoveController } from '../controllers/mainUserControllers/MoveController';
import { ViewController } from '../controllers/ViewController';
import { SlideController } from '../controllers/mainUserControllers/SlideController';
import { AttackController } from '../controllers/mainUserControllers/AttackController';
import { USER_BODY_GROUP } from '../../bodyGroups/user';
import { MainUserController } from '../MainUserStorage/controller';
import { Filters, USER_LABEL } from '../../constants';
import { FallController } from '../controllers/FallController';
import { ResetUserController } from '../controllers/mainUserControllers/ResetUserController';
import { DeathListener } from '../controllers/DeathController/listener';
import { MainUserDeathWrapper } from '../controllers/mainUserControllers/MainUserDeathWrapper';
import { HealController } from '../controllers/mainUserControllers/HealController';
import { MainUserSpriteDirectionController } from '../controllers/mainUserControllers/MainUserSpriteDirectionController';
import { selectSettingsAutorunState } from '../../redux/settings/selectors';
import { AutomoveController } from '../controllers/mainUserControllers/AutomoveController';
import { MainUserHealthController } from '../controllers/mainUserControllers/MainUserHealthController';
import {
  selectPageGameInitedState,
  selectPageGameSpeedMultCalculated,
} from '../../redux/gamePage/selectors';
import { Container } from '@pixi/react';

const initialRunAnimationSpeed = 0.07;

const test = '/eva/eva.json';
const animationMap = {
  [AnimationList.Idle]: { name: 'expectation', speed: 0.07, loop: true, priority: 1 },
  [AnimationList.Run]: { name: 'run', speed: 0.07, loop: true, priority: 2 },
  [AnimationList.Slide]: { name: 'sliding', speed: 0.07, loop: true, priority: 3 },
  [AnimationList.Fall]: { name: 'fall', speed: 0.07, loop: true, priority: 4 },
  [AnimationList.Jump]: { name: 'jump', speed: 0.09, loop: false, priority: 5 },
  [AnimationList.Attack]: { name: 'attack', speed: 0.15, loop: false, priority: 6 },
  [AnimationList.Heal]: { name: 'heal', speed: 0.15, loop: false, priority: 7 },
  [AnimationList.Hurt]: { name: 'hurt', speed: 0.12, loop: true, priority: 8 },
  [AnimationList.Die]: {
    name: 'death',
    speed: 0.1,
    loop: false,
    priority: 9,
  },
};

const MAX_HEALTH = 3;
export const USER_COOLDOWN = 700;
export const BODY_FRICTION = 0.05;
export const HEAL_COOLDOWN_VALUE = 60 * 1000;
const SLIDE_COOLDOWN_VALUE = 600;
const MAIN_BODY_OPTIONS = { inertia: Infinity, friction: BODY_FRICTION, weight: 300 };
const INVICIBILITY_PERIOD = 2000;
const FILTERS = [Filters.SHADOW_FILTER];

type Props = {
  x: number;
  y: number;
};

export const ControllableBody = ({ x, y }: Props) => {
  const userLabelRef = useRef(uniqueId(USER_LABEL));
  const isAutorunEnabled = useSelector(selectSettingsAutorunState);
  const isInited = useSelector(selectPageGameInitedState);
  const runSpeed = useSelector(selectPageGameSpeedMultCalculated(initialRunAnimationSpeed * 2));

  animationMap.run.speed = runSpeed;

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
          filters={FILTERS}
        >
          <ViewController />
          <AnimationController animationParams={animationMap}>
            {isInited && (
              <Container>
                <MainUserSpriteDirectionController />
                <MainUserDeathWrapper>
                  {isAutorunEnabled ? <AutomoveController /> : <MoveController />}
                  <JumpController />
                  <FallController />
                  <HealController cooldown={HEAL_COOLDOWN_VALUE} />
                  <MainUserHealthController
                    initialHealth={MAX_HEALTH}
                    maxHealth={MAX_HEALTH}
                    cooldown={INVICIBILITY_PERIOD}
                  />
                  <DeathListener />
                  <ResetUserController x={x} y={y} />
                  <AttackController width={70} height={100} cooldown={USER_COOLDOWN}>
                    <DamageTouchController pushToSide="left" />
                    <SlideController cooldown={SLIDE_COOLDOWN_VALUE} />
                  </AttackController>
                </MainUserDeathWrapper>
              </Container>
            )}
          </AnimationController>
        </AnimatedSpriteController>
      </GroundTouchController>
    </Body>
  );
};
