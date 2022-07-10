import {
  WT_FINISH_FETCH_DATA,
  WT_PENDING_FETCH_DATA,
  WT_SUCCESS_FETCH_DATA,
} from './actions/actions';
import { WorldtimeActions } from './actions/actionsCreatorsTypes';
import { WorldtimeState } from './types';

const initNotes = () => {
  const initialNotes = localStorage.getItem('userNotes');
  return initialNotes === null ? [] : JSON.parse(initialNotes);
};

const initialState: WorldtimeState = {
  data: initNotes(),
  loading: false,
};

export function reducer(state = initialState, actions?: WorldtimeActions): WorldtimeState {
  switch (actions?.type) {
    case WT_PENDING_FETCH_DATA:
      return { ...state, loading: true };
    case WT_SUCCESS_FETCH_DATA:
      return { ...state, data: [...state.data, actions.payload] };
    case WT_FINISH_FETCH_DATA:
      return { ...state, loading: false };

    default:
      return state;
  }
}
