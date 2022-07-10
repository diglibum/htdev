import { ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Timezone } from '../../api/types';
import { AppState, ThunkExtraArgument } from '../types';
import { TimezonesActions } from './actions/actionsCreatorsTypes';

export type TimezonesState = {
  data: Timezone[] | null;
  loading: boolean;
};
export type TimezonesThunkDispatch = ThunkDispatch<AppState, ThunkExtraArgument, TimezonesActions>;

export type TimezonesActionCreator = ActionCreator<
  ThunkAction<Promise<TimezonesActions | void>, AppState, ThunkExtraArgument, TimezonesActions>
>;
