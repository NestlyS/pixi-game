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

export const USER_HEALTH_ID = `user_${Number(uniqueId())}`;
export const USER_LABEL = `user_${USER_HEALTH_ID}`;
const test = '/eva/texture.json';
const animationMap = {
  Idle: {name: 'stand', speed: 0.07, loop: true},
  Run: {name: 'run', speed: 0.07, loop: true},
  Fall: {name: 'fall', speed: 0.07, loop: true},
  Jump: {name: 'jump', speed: 0.09, loop: false},
  Hurt: {name: 'hurt', speed: 0.07, loop: true},
  Slide: {name: 'slide', speed: 0.07, loop: true},
}

export const BODY_FRICTION = 0.05;
const MAIN_BODY_OPTIONS = { inertia: Infinity, friction: BODY_FRICTION, weight: 300 };
const INVICIBILITY_PERIOD = 1000;

export const ControllableBody = () => {
  return (
    <Body x={800} y={0} width={50} height={120} options={MAIN_BODY_OPTIONS} label={USER_LABEL}>
      <GroundTouchController>
        <MoveController />
        <JumpController />
        <ViewController />
        <HealthController bodyId={USER_HEALTH_ID} cooldown={INVICIBILITY_PERIOD}>
          <AttackController width={100} height={40}>
            <AnimatedSpriteController width={190} height={180} spritesheet={test} animationSpeed={0.07} setDefault zIndex={100} >
              <ViewController />
              <DamageTouchController />
              <SlideController>
                <AnimationController animationNames={animationMap}/>
              </SlideController>
            </AnimatedSpriteController>
          </AttackController>
        </HealthController>
      </GroundTouchController>
    </Body>
  )
}
