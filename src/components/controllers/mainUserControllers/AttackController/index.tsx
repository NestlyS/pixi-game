import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DAMAGABLE_BODY_GROUP } from '../../../../bodyGroups/damagable';
import { USER_BODY_GROUP } from '../../../../bodyGroups/user';
import { useControlKey } from '../../../../utils/useControlKey';
import { useBody } from '../../../Body/context';
import { applyForce } from '../../../Body/utils';
import { AnimationList, useAnimationController } from '../../AnimationController/context';
import { ConnectedSensorController } from '../../ConntectedSensorController';
import { isSensorLabel } from '../../ConntectedSensorController/utils';
import { initialState, AttackingContextProvider, AttackingAnimationProvider } from './context';
import { ATTACK_KEY_CODE, ATTACK_KEY_CODE_EXTRA } from '../../../../constants';
import { setAttackCooldown } from '../../../../redux/mainUser';
import {
  selectMainUserAttackCooldown,
  selectMainUserHurtedState,
} from '../../../../redux/mainUser/selectors';
import { makeDamageToHealthEntity } from '../../../../redux/health';
import { getBodyId } from '../../../../utils/getBodyId';
import { SoundTypes, Sounds, playSound } from '../../../../utils/soundController';
import { selectPageGamePauseState } from '../../../../redux/gamePage/selectors';

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
  const { releaseAnimation, requestAnimation } = useAnimationController();
  const isHurted = useSelector(selectMainUserHurtedState);
  const [isAttacing, setAttacting] = useState(initialState);
  const attackColldown = useSelector(selectMainUserAttackCooldown);
  const isPaused = useSelector(selectPageGamePauseState);

  const dispatch = useDispatch();

  const onCollision = useCallback(
    (e: Matter.IEventCollision<Matter.Engine>) => {
      const collidedBodies = e.pairs.map((pair) =>
        isSensorLabel(pair.bodyA.label) ? pair.bodyB : pair.bodyA,
      );

      const collidedBody = DAMAGABLE_BODY_GROUP.get().find((damagableBody) =>
        collidedBodies.includes(damagableBody),
      );

      if (collidedBody) {
        dispatch(makeDamageToHealthEntity({ amount: DAMAGE_VALUE, id: getBodyId(collidedBody) }));
      }
    },
    [dispatch],
  );

  const mouseCb = useCallback(() => {
    if (isHurted || isPaused || attackColldown) return;

    requestAnimation({
      name: AnimationList.Attack,
      onFinish: () => {
        releaseAnimation(AnimationList.Attack);
        setAttacting(false);
      },
    });

    playSound(Sounds.Attack);
    setAttacting(true);
    dispatch(setAttackCooldown(cooldown));

    setTimeout(() => {
      dispatch(setAttackCooldown(0));
    }, cooldown);

    applyForce(body, body.velocity.x, ATTACK_BOOST);
  }, [
    isHurted,
    isPaused,
    attackColldown,
    requestAnimation,
    dispatch,
    cooldown,
    body,
    releaseAnimation,
  ]);

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
