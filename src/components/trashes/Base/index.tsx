import uniqueId from 'lodash.uniqueid';
import React, { useCallback, useRef, useState } from 'react';
import { USER_BODY_GROUP } from '../../../bodyGroups/user';
import { Body } from '../../Body';
import { AnimatedSpriteController } from '../../controllers/AnimatedSpriteController';
import { useTrash } from '../../TrashStorage/context';
import { TrashTypes } from '../../TrashStorage/typings';
import { TrashBodyController } from './controller';
import { WHITE_OUTLINE_FILTER } from '../../../constants';

const TRASH_WIDTH = 40;
const TRASH_HEIGHT = 40;
const ANIMATION_AMPLITUDE = 5;

const TRASH_PARAMS: Matter.IChamferableBodyDefinition = {
  isSensor: true,
  isStatic: true,
};

type Props = {
  x: number;
  y: number;
  animationName: string;
  spritesheetUrl: string;
  type: TrashTypes;
  onDelete?: () => void;
};

export const Trash = ({ x, y, animationName, spritesheetUrl, type, onDelete }: Props) => {
  const trashLabelRef = useRef(uniqueId('trash'));
  const [isTouched, setTouch] = useState(false);
  const { set } = useTrash();

  const onCollision = useCallback(
    (e: Matter.IEventCollision<Matter.Engine>) => {
      console.log('COLLIDED PAIR', [...e.pairs]);
      if (isTouched) return;

      const collidedPair = e.pairs.find((pair) =>
        USER_BODY_GROUP.get().some(
          (body) => body.id === pair.bodyA.id || body.id === pair.bodyB.id,
        ),
      );

      if (!collidedPair) return;

      const collidedUser =
        collidedPair.bodyA.label === trashLabelRef.current
          ? collidedPair.bodyB
          : collidedPair.bodyA;

      console.log('TRASHING', collidedUser);
      set(collidedUser.label, type, (prev) => prev + 1);
      setTouch(true);
    },
    [isTouched, set, type],
  );

  return (
    <Body
      x={x}
      y={y}
      options={TRASH_PARAMS}
      width={TRASH_WIDTH}
      height={TRASH_HEIGHT}
      onCollision={onCollision}
      label={trashLabelRef.current}
    >
      <TrashBodyController
        amplitude={ANIMATION_AMPLITUDE}
        isTouched={isTouched}
        onDelete={onDelete}
      />
      <AnimatedSpriteController
        spritesheet={spritesheetUrl}
        initialAnimation={animationName}
        width={TRASH_WIDTH}
        height={TRASH_HEIGHT}
        zIndex={100}
        filters={[WHITE_OUTLINE_FILTER]}
      />
    </Body>
  );
};
