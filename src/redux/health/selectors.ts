import { Body } from 'matter-js';
import { IAppState } from '..';
import { Health, adapter } from './adapter';
import { getBodyId } from '../../utils/getBodyId';

const selectors = adapter.getSelectors();

export const selectHealth = (state: IAppState) => state.health;

export const selectHealthEntityByIdFromAdapter =
  (id: Health['id']) => (healthState: IAppState['health']) =>
    selectors.selectById(healthState, id);

export const selectHealthEntityById = (id: Health['id']) => (state: IAppState) =>
  selectHealthEntityByIdFromAdapter(id)(selectHealth(state));

export const selectHealthValueById = (id: Health['id'] | null) => (state: IAppState) =>
  id ? selectHealthEntityById(id)(state)?.value ?? null : null;

export const selectHealthValueByBody = (body: Body) => (state: IAppState) =>
  selectHealthEntityById(getBodyId(body))(state)?.value ?? null;
