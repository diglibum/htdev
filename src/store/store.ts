import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { timezonesReducer } from './timezones';
import { ThunkExtraArgument } from './types';
import { timezonesApi } from '../api/TimezonesApi';
import { notesReducer } from './notes';
import { settingsReducer } from './settings';
import { notificationReducer } from './notification';

export const rootReducer = combineReducers({
  settings: settingsReducer,
  timezones: timezonesReducer,
  notes: notesReducer,
  notification: notificationReducer,
});

const thunkExtraArgument: ThunkExtraArgument = {
  api: {
    timezones: timezonesApi,
  },
};

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument(thunkExtraArgument)),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
