import {
  TZ_FINISH_FETCH_LIST_DATA,
  TZ_PENDING_FETCH_LIST_DATA,
  TZ_SUCCESS_FETCH_LIST_DATA,
} from './actions/actions';
import { TimezonesActions } from './actions/actionsCreatorsTypes';
import { TimezonesState } from './types';

const initialState: TimezonesState = {
  data: [],
  loading: false,
};

export function reducer(state = initialState, actions?: TimezonesActions): TimezonesState {
  switch (actions?.type) {
    case TZ_PENDING_FETCH_LIST_DATA:
      return { ...state, loading: true };
    case TZ_SUCCESS_FETCH_LIST_DATA:
      return { ...state, data: actions.payload };
    case TZ_FINISH_FETCH_LIST_DATA:
      return { ...state, loading: false };

    default:
      return state;
  }
}
