import { Body } from '../Body';
import { AnimatedSpriteController } from '../controllers/AnimatedSpriteController';
import { AnimationController } from '../controllers/AnimationController';
import { JumpController } from '../controllers/JumpController';
import { MoveController } from '../controllers/MoveController';
import { ViewController } from '../controllers/ViewController';

const test = '/adventurer-Sheet.json';

export const BODY_FRICTION = 0.05;
const MAIN_BODY_OPTIONS = { inertia: Infinity, friction: BODY_FRICTION, weight: 300 };

export const ControllableBody = () => {
  return (
    <Body x={800} y={200} width={50} height={120} options={MAIN_BODY_OPTIONS}>
      <MoveController />
      <JumpController />
      <ViewController />
      <AnimatedSpriteController width={200} height={140} spritesheet={test} animationSpeed={0.1} setDefault>
        <ViewController />
        <AnimationController />
      </AnimatedSpriteController>
    </Body>
  )
}
