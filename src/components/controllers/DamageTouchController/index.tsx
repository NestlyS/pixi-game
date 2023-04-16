import { useCallback } from 'react';
import { DAMAGING_BODY_GROUP } from '../../../bodyGroups/damaging';
import { useBody } from '../../Body/context';
import { CleanEventType } from '../../Body/typing';
import { TouchController } from '../TouchController';
import { useDispatch } from 'react-redux';
import { makeDamageToHealthEntity } from '../../../redux/health';
import { getBodyId } from '../../../utils/getBodyId';

const DAMAGE_AMOUNT = 1;

export const DamageTouchController = () => {
  const { body } = useBody();
  const dispatch = useDispatch();

  const onTouch = useCallback(
    (e: CleanEventType) => {
      const isDamaged = e.pairs.find(
        (pair) =>
          DAMAGING_BODY_GROUP.get().includes(pair.bodyA) ||
          DAMAGING_BODY_GROUP.get().includes(pair.bodyB),
      );
      if (isDamaged)
        dispatch(makeDamageToHealthEntity({ id: getBodyId(body), amount: DAMAGE_AMOUNT }));
    },
    [body],
  );

  return <TouchController onTouch={onTouch} />;
};
