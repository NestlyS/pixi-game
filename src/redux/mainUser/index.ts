import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TrashTypes } from '../../components/TrashStorage/typings';
import { Directions } from '../../components/Bullet/controller';

type MainUserState = {
  id: number | string | null;
  maxHp: number;
  direction: Directions.Left | Directions.Right;
  specialCooldown: number;
  attackCooldown: number;
  trashCount: Record<TrashTypes, number>;
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
};

const mainUserSlice = createSlice({
  name: 'MainUser',
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
  },
});

export const mainUserReducer = mainUserSlice.reducer;
export const { setId, setMaxHp, setSpeciaCooldown, setAttackCooldown, setDirection } =
  mainUserSlice.actions;
