import uniqueId from 'lodash.uniqueid';
import React, { useCallback, useRef, useState } from 'react';
import { USER_BODY_GROUP } from '../../../bodyGroups/user';
import { Body } from '../../Body';
import { AnimatedSpriteController } from '../../controllers/AnimatedSpriteController';
import { TrashBodyController } from './controller';
import { Filters } from '../../../constants';
import { SoundTypes, Sounds, playSound } from '../../../utils/soundController';
import { useDispatch } from 'react-redux';
import { TrashTypes } from '../../../redux/mainUser/typings';
import { incTrash } from '../../../redux/mainUser';

const TRASH_WIDTH = 40;
const TRASH_HEIGHT = 40;
const ANIMATION_AMPLITUDE = 5;
const FILTERS = [Filters.WHITE_OUTLINE_FILTER];

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
  isUncollectable?: boolean;
};

export const Trash = ({
  x,
  y,
  animationName,
  spritesheetUrl,
  type,
  onDelete,
  isUncollectable,
}: Props) => {
  const trashLabelRef = useRef(uniqueId('trash'));
  const [isTouched, setTouch] = useState(false);
  const dispatch = useDispatch();

  const onCollision = useCallback(
    (e: Matter.IEventCollision<Matter.Engine>) => {
      if (isUncollectable) return;
      if (isTouched) return;

      const collidedPair = e.pairs.find((pair) =>
        USER_BODY_GROUP.get().some(
          (body) => body.id === pair.bodyA.id || body.id === pair.bodyB.id,
        ),
      );

      if (!collidedPair) return;

      dispatch(incTrash(type));
      setTouch(true);
      playSound(Sounds.Collect);
    },
    [dispatch, isTouched, isUncollectable, type],
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
        filters={FILTERS}
      />
    </Body>
  );
};
