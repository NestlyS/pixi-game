import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { mainUserReducer } from './mainUser';
import { __IS_DEV__ } from '../constants';
import { settingsReducer } from './settings';
import { healthReducer } from './health';
import { appControllerReducer } from './appController';
import { novelPageReducer } from './novelPage';
import { gamePageReducer } from './gamePage';
import { textBlockReducer } from './textBlockController';

export const store = configureStore({
  reducer: combineReducers({
    mainUser: mainUserReducer,
    settings: settingsReducer,
    health: healthReducer,
    appController: appControllerReducer,
    novel: novelPageReducer,
    game: gamePageReducer,
    textBlock: textBlockReducer,
  }),
  devTools: __IS_DEV__,
});

export type IAppState = ReturnType<typeof store.getState>;
