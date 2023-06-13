import { Pair } from 'matter-js';
import { createBodyGroup } from './createBodyGroup';

export const USER_LABEL = 'user';
export const USER_BODY_GROUP = createBodyGroup(USER_LABEL);
export const isAnyPairInUserBodyGroup = (pairs: Pair[]) =>
  pairs.find((pair) =>
    USER_BODY_GROUP.get().find(
      (body) => pair.bodyA.label === body.label || pair.bodyB.label === body.label,
    ),
  );
