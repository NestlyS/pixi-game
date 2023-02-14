import { Body as Matter_Body, IEventCollision } from 'matter-js';
import { NegativeShould, PositiveShould, ShouldApplyForce } from './typing';

export const applyForce = (body: Matter_Body, toX: number, toY: number) =>
  Matter_Body.setVelocity(body, {
    x: toX,
    y: toY,
  });

export const isPositiveShould = (props: NegativeShould | PositiveShould): props is PositiveShould =>
  props.should === true;
export const calcForceApply = ({
  body,
  shouldApplyForce,
}: {
  body: Matter_Body;
  shouldApplyForce?: ShouldApplyForce;
}) => {
  if (!shouldApplyForce) {
    return;
  }

  const props = shouldApplyForce();

  if (!isPositiveShould(props)) {
    return;
  }

  if (Math.abs(body.velocity.x) > 10) {
    return;
  }

  Matter_Body.setVelocity(body, {
    x: props.toX,
    y: props.toY,
  });
};

export const checkIsBodyInPairs = (
  pairs: IEventCollision<Matter.Engine>['pairs'],
  body?: Matter_Body | null,
) => !!body && pairs.some(({ bodyB, bodyA }) => body === bodyA || body === bodyB);
