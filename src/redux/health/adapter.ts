import { createEntityAdapter } from '@reduxjs/toolkit';

export type Health = {
  id: string;
  value: number;
  maxValue?: number;
  invincible: boolean;
};

export const adapter = createEntityAdapter<Health>({
  selectId: (user) => user.id,
});
