import { useCallback, useEffect, useState } from 'react';

import { CleanEventType } from '../Body/typing';
import { TouchController } from '../controllers/TouchController';
import { AnimationList, useAnimationController } from '../controllers/AnimationController/context';
import { isAnyPairInUserBodyGroup } from '../../bodyGroups/user';
import { useBody } from '../Body/context';
import { useSlowerTick } from '../../utils/useSlowedTick';

type Props = {
  onCollision?: (cb: () => void) => void;
};

export const GnidaTouchController = ({ onCollision }: Props) => {
  const { body } = useBody();
  const [isScripted, setScripted] = useState(false);
  const { requestAnimation } = useAnimationController();

  const onTouch = useCallback(
    (e: CleanEventType) => {
      if (!isAnyPairInUserBodyGroup(e.pairs)) return;

      const postCollision = () => {
        requestAnimation({ name: AnimationList.Run });
        setScripted(true);
      };

      if (onCollision) {
        onCollision(postCollision);
        return;
      }

      postCollision();
    },
    [onCollision, requestAnimation],
  );

  useSlowerTick(() => {
    if (!isScripted) return;

    body.position.x -= 3;
  }, 5);

  if (isScripted) return null;

  return <TouchController onTouch={onTouch} />;
};
