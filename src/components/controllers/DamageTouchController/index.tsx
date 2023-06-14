import { useCallback } from 'react';
import { DAMAGING_BODY_GROUP } from '../../../bodyGroups/damaging';
import { useBody } from '../../Body/context';
import { CleanEventType } from '../../Body/typing';
import { TouchController } from '../TouchController';
import { useDispatch } from 'react-redux';
import { makeDamageToHealthEntity } from '../../../redux/health';
import { getBodyId } from '../../../utils/getBodyId';
import { applyForce } from '../../Body/utils';
import { isCrackBody } from '../../Chunk/components/Crack';
import { isUserLabel } from '../ConntectedSensorController/utils';

const DAMAGE_AMOUNT = 1;
const FORCE_STRENGH = 5;

type Props = {
  pushToSide?: 'left' | 'right';
};

export const DamageTouchController = ({ pushToSide }: Props) => {
  const { body } = useBody();
  const dispatch = useDispatch();

  const onTouch = useCallback(
    (e: CleanEventType) => {
      const isDamaged = e.pairs.find(
        (pair) =>
          DAMAGING_BODY_GROUP.get().includes(pair.bodyA) ||
          DAMAGING_BODY_GROUP.get().includes(pair.bodyB),
      );
      if (!isDamaged) return;

      dispatch(makeDamageToHealthEntity({ id: getBodyId(body), amount: DAMAGE_AMOUNT }));

      if (!pushToSide) return;
      if (isCrackBody(isUserLabel(isDamaged.bodyA) ? isDamaged.bodyB : isDamaged.bodyA)) return;

      const toX = pushToSide === 'left' ? FORCE_STRENGH * -1 : FORCE_STRENGH;
      applyForce(body, toX, -FORCE_STRENGH);
    },
    [body, dispatch, pushToSide],
  );

  return <TouchController onTouch={onTouch} />;
};
