import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DAMAGABLE_BODY_GROUP } from '../../../bodyGroups/damagable';
import { USER_BODY_GROUP } from '../../../bodyGroups/user';
import { useControlKey } from '../../../utils/useControlKey';
import { useBody } from '../../Body/context';
import { applyForce } from '../../Body/utils';
import { useHealth } from '../../HealthStorage/context';
import { getBodyId } from '../../HealthStorage/utils';
import { AnimationList, useAnimationController } from '../AnimationController/context';
import { ConnectedSensorController } from '../ConntectedSensorController';
import { isSensorLabel } from '../ConntectedSensorController/utils';
import { initialState, AttackingContextProvider, AttackingAnimationProvider } from './context';
import { ATTACK_KEY_CODE, ATTACK_KEY_CODE_EXTRA } from '../../../constants';
import { selectSettingsPauseState } from '../../../redux/settings/selectors';
import { setAttackCooldown } from '../../../redux/mainUser';
import { selectMainUserAttackCooldown } from '../../../redux/mainUser/selectors';

const DAMAGE_VALUE = 1;
const ATTACK_BOOST = -5;

type Props = {
  children: React.ReactNode;
  width: number;
  height: number;
  cooldown: number;
};

export const AttackController = ({ children, width, height, cooldown = 1000 }: Props) => {
  const { body } = useBody();
  const { setHealth } = useHealth();
  const { releaseAnimation, requestAnimation } = useAnimationController();
  const [isAttacing, setAttacting] = useState(initialState);
  const attackColldown = useSelector(selectMainUserAttackCooldown);
  const isPaused = useSelector(selectSettingsPauseState);

  const dispatch = useDispatch();


  const onCollision = useCallback(
    (e: Matter.IEventCollision<Matter.Engine>) => {
      const collidedBodies = e.pairs.map((pair) =>
        isSensorLabel(pair.bodyA.label) ? pair.bodyB : pair.bodyA,
      );

      const collidedBody = DAMAGABLE_BODY_GROUP.get().find((damagableBody) =>
        collidedBodies.includes(damagableBody),
      );

      console.log('DAMAGING', DAMAGABLE_BODY_GROUP.get(), collidedBody);
      if (collidedBody?.id) {
        setHealth((value) => (value ? value - DAMAGE_VALUE : value), getBodyId(collidedBody));
      }
    },
    [setHealth],
  );

  const mouseCb = useCallback(() => {
    if (isPaused || attackColldown) return;

    requestAnimation({
      name: AnimationList.Attack, onFinish: () => {
        releaseAnimation(AnimationList.Attack);
        setAttacting(false);
      }
    });

    setAttacting(true);
    dispatch(setAttackCooldown(cooldown));

    setTimeout(() => {
      dispatch(setAttackCooldown(0));
    }, cooldown);

    applyForce(body, body.velocity.x, ATTACK_BOOST);
  }, [body, isPaused, requestAnimation, attackColldown]);

  useControlKey(ATTACK_KEY_CODE, mouseCb);
  useControlKey(ATTACK_KEY_CODE_EXTRA, mouseCb);

  return (
    <AttackingContextProvider value={isAttacing}>
      <AttackingAnimationProvider value={isAttacing}>
        <ConnectedSensorController
          isHidden={!isAttacing}
          bodyGroup={USER_BODY_GROUP}
          width={width}
          height={height}
          onCollision={onCollision}
        />
        {children}
      </AttackingAnimationProvider>
    </AttackingContextProvider>
  );
};
