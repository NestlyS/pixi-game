import { Body } from 'matter-js';
import { USER_BODY_GROUP } from '../../../bodyGroups/user';
import { ATTACK_SENSOR_LABEL } from '../../../constants';

export const isSensorLabel = (label: string) => label.includes(ATTACK_SENSOR_LABEL);
export const isUserLabel = (body: Body) => USER_BODY_GROUP.get().includes(body);
export const isUserSensorLabel = (body: Body) => isSensorLabel(body.label) && isUserLabel(body);
