import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Health, adapter } from './adapter';
import { selectHealthEntityByIdFromAdapter } from './selectors';

type InitUserPayloadAction = PayloadAction<{ id: string; value: number; maxValue?: number }>;
type ChangeUserHealthPayloadAction = PayloadAction<{ id: string; amount: number }>;

const healthSlice = createSlice({
  name: 'health',
  initialState: adapter.getInitialState(),
  reducers: {
    initHealthEntity(state, { payload }: InitUserPayloadAction) {
      adapter.upsertOne(state, { ...payload, invincible: false });
    },

    makeDamageToHealthEntity(state, action: ChangeUserHealthPayloadAction) {
      const {
        payload: { id, amount },
      } = action;
      const entity = selectHealthEntityByIdFromAdapter(id)(state);

      if (!entity || entity.invincible) return;

      adapter.updateOne(state, { id, changes: { value: entity.value - amount } });
    },

    makeHealToHealthEntity(state, action: ChangeUserHealthPayloadAction) {
      const {
        payload: { id, amount },
      } = action;
      const entity = selectHealthEntityByIdFromAdapter(id)(state);

      if (!entity) return;

      const { maxValue, value } = entity;

      const newValue = maxValue && maxValue < value + amount ? maxValue : value + amount;

      adapter.updateOne(state, { id, changes: { value: newValue } });
    },

    setInvicibility(state, action: PayloadAction<Health['id']>) {
      const entity = selectHealthEntityByIdFromAdapter(action.payload)(state);

      if (!entity) return;

      adapter.updateOne(state, { id: action.payload, changes: { invincible: true } });
    },

    unsetInvicibility(state, action: PayloadAction<Health['id']>) {
      const entity = selectHealthEntityByIdFromAdapter(action.payload)(state);

      if (!entity) return;

      adapter.updateOne(state, { id: action.payload, changes: { invincible: false } });
    },
  },
});

export const healthReducer = healthSlice.reducer;
export const {
  initHealthEntity,
  makeDamageToHealthEntity,
  makeHealToHealthEntity,
  setInvicibility,
  unsetInvicibility,
} = healthSlice.actions;
