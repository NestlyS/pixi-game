import { useCallback } from 'react';
import { useControlKey } from '../../../utils/useControlKey';
import { useBody } from '../../Body/context';
import { applyForce } from '../../Body/utils';

const HORIZONTAL_SPEED = 5;
const MAX_SPEED = 7;

// ВОЗМОЖНО СТОИТ ОБЪЕДИНИТЬ КОНТРОЛЛЕРЫ ПЕРЕМЕЩЕНИЯ В ОДИН ТИП
export const MoveController = () => {
  const {
    body
  } = useBody();

  const DCb = useCallback(() => {
    if (!body || body.velocity.x > MAX_SPEED) return;
    applyForce(body, HORIZONTAL_SPEED, body.velocity.y);
  }, [body]);

  const ACb = useCallback(() => {
    if (!body || body.velocity.x < -MAX_SPEED) return;
    applyForce(body, -HORIZONTAL_SPEED, body.velocity.y);
  }, [body]);

  useControlKey('KeyD', DCb);

  useControlKey('KeyA', ACb);

  return null;
}
