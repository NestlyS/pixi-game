import uniqueId from 'lodash.uniqueid';
import { useState } from 'react';
import { DAMAGABLE_BODY_GROUP } from '../../bodyGroups/damagable';
import { DAMAGING_BODY_GROUP } from '../../bodyGroups/damaging';
import { GROUND_BODY_GROUP } from '../../bodyGroups/ground';
import { Body } from '../Body'
import { spritesheetUrl } from '../Canvas';
import { DeathListener } from '../controllers/DeathController/listener';
import { DeathWrapper } from '../controllers/DeathController/wrapper';
import { HealthController } from '../controllers/HealthController';
import { SpriteController } from '../controllers/SpriteController'

const BOX_GROUP = [GROUND_BODY_GROUP, DAMAGABLE_BODY_GROUP, DAMAGING_BODY_GROUP];
const texture = 'box.png';

type Props = {
  x: number,
  y: number,
  width: number,
  height: number,
}

export const Box = ({
  x,
  y,
  width,
  height
}: Props) => {
  return (
    <DeathWrapper>
      <Body x={x} y={y} width={width} height={height} bodyGroup={BOX_GROUP} label="box">
        <HealthController initialHealth={1}>
          <DeathListener />
        </HealthController>
        <SpriteController width={width} height={height} spritesheet={spritesheetUrl} textureUrl={texture} zIndex={20}/>
      </Body>
    </DeathWrapper>
  )
}
