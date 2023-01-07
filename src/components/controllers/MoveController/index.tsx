import { useTick } from '@inlet/react-pixi';
import React, { useCallback, useState } from 'react';
import { EPS } from '../../../constants';
import { useControlKey } from '../../../utils/useControlKey';
import { useBodyParams } from '../../Body/context';
import { applyForce, calcForceApply } from '../../Body/utils';
import { BODY_FRICTION } from '../../Controllable';

const HORIZONTAL_SPEED = 0.025;
const MAX_SPEED = 7;

export const MoveController = () => {
  const {
    body
  } = useBodyParams();

  const DCb = useCallback(() => {
    if (!body || body.velocity.x > MAX_SPEED) return;
    applyForce(body, HORIZONTAL_SPEED, 0);
  }, [body]);

  const ACb = useCallback(() => {
    if (!body || body.velocity.x < -MAX_SPEED) return;
    applyForce(body, -HORIZONTAL_SPEED, 0);
  }, [body]);

  useControlKey('KeyD', DCb);

  useControlKey('KeyA', ACb);

  return null;
}
