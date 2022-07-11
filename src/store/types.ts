import { timezonesApi } from '../api/TimezonesApi';
import { TimezonesState } from './timezones/types';

export type ThunkExtraArgument = {
  api: {
    timezones: typeof timezonesApi;
  };
};

export interface AppState {
  timezones: TimezonesState;
}
