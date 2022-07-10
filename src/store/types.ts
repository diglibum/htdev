import { timezonesApi } from '../api/TimezonesApi';
import { TimezonesState } from './timezones/types';

export type ThunkExtraArgument = {
  api: {
    timezones: typeof timezonesApi;
    //   auth: typeof localAuthApi;
    //   users: typeof usersAPI;
    //   dbUsers: typeof usersDbAPI;
  };
};

export interface AppState {
  timezones: TimezonesState;
  //   leaderboard: LeaderboardState;
  //   theme: ThemeState;
  //   notifications: NotificationState;
}
