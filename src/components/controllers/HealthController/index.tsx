import { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useBody } from '../../Body/context';

import { initHealthEntity, setInvicibility, unsetInvicibility } from '../../../redux/health';
import { Health } from '../../../redux/health/adapter';
import { selectHealthValueByBody } from '../../../redux/health/selectors';
import { getBodyId } from '../../../utils/getBodyId';

type Props = {
  initialHealth: number;
  maxHealth: number;
  cooldown?: number;
  onDamage?: (cooldown?: number) => void;
  onDamageEnd?: () => void;
};

export const HealthController = memo(
  ({ initialHealth, maxHealth, cooldown, onDamage, onDamageEnd }: Props) => {
    const { body } = useBody();

    const healthAmount = useSelector(selectHealthValueByBody(body));
    const prevValue = useRef<Health['value'] | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(
        initHealthEntity({ id: getBodyId(body), value: initialHealth, maxValue: maxHealth }),
      );
    }, [body, dispatch, initialHealth, maxHealth]);

    useEffect(() => {
      if (!healthAmount || !body) {
        return;
      }

      if (prevValue.current === null) {
        prevValue.current = healthAmount;
        return;
      }

      const isHealthDecrease = prevValue.current > healthAmount;
      prevValue.current = healthAmount;

      if (isHealthDecrease && onDamage) {
        onDamage(cooldown);
      }

      if (isHealthDecrease && cooldown) {
        dispatch(setInvicibility(getBodyId(body)));
        setTimeout(() => {
          dispatch(unsetInvicibility(getBodyId(body)));
        }, cooldown);
      }

      if (!isHealthDecrease && onDamageEnd) {
        onDamageEnd();
      }
    }, [body, cooldown, dispatch, healthAmount, onDamage, onDamageEnd]);

    return null;
  },
);
