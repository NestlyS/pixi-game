import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TrashTypes } from './typings';
import { Directions } from '../../components/Bullet/controller';

type MainUserState = {
  id: number | string | null;
  maxHp: number;
  direction: Directions.Left | Directions.Right;
  specialCooldown: number;
  attackCooldown: number;
  trashCount: Record<TrashTypes, number>;
  isHurted: boolean;
  isStopped: boolean;
};

const initialState: MainUserState = {
  id: null,
  maxHp: 0,
  direction: Directions.Right,
  specialCooldown: 0,
  attackCooldown: 0,
  trashCount: {
    paper: 0,
    bottle: 0,
    chips: 0,
  },
  isHurted: false,
  isStopped: false,
};

const mainUserSlice = createSlice({
  name: 'mainUser',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<MainUserState['id']>) => {
      state.id = action.payload;
    },

    setMaxHp: (state, action: PayloadAction<MainUserState['maxHp']>) => {
      state.maxHp = action.payload;
    },

    setSpeciaCooldown: (state, action: PayloadAction<MainUserState['specialCooldown']>) => {
      state.specialCooldown = action.payload;
    },

    setAttackCooldown: (state, action: PayloadAction<MainUserState['attackCooldown']>) => {
      state.attackCooldown = action.payload;
    },

    setDirection: (state, action: PayloadAction<MainUserState['direction']>) => {
      state.direction = action.payload;
    },

    incTrash: (state, action: PayloadAction<TrashTypes>) => {
      state.trashCount[action.payload] += 1;
    },

    resetTrash: (state) => {
      state.trashCount = Object.keys(state.trashCount).reduce((acc, key) => {
        acc[key as TrashTypes] = 0;
        return acc;
      }, {} as Record<TrashTypes, number>);
    },

    setHurted: (state) => {
      state.isHurted = true;
    },

    unsetHurted: (state) => {
      state.isHurted = false;
    },

    stopPlayer: (state) => {
      state.isStopped = true;
    },

    releasePlayer: (state) => {
      state.isStopped = false;
    },
  },
});

export const mainUserReducer = mainUserSlice.reducer;
export const {
  setId,
  setMaxHp,
  setSpeciaCooldown,
  setAttackCooldown,
  setHurted,
  unsetHurted,
  setDirection,
  incTrash,
  resetTrash,
  stopPlayer,
  releasePlayer,
} = mainUserSlice.actions;
