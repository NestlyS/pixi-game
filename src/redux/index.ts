import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { mainUserReducer } from './mainUser';
import { __IS_DEV__ } from '../constants';
import { settingsReducer } from './settings';

export const store = configureStore({
  reducer: combineReducers({
    mainUser: mainUserReducer,
    settings: settingsReducer,
  }),
  devTools: __IS_DEV__,
});

export type IAppState = ReturnType<typeof store.getState>;
