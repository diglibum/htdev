import {
  MSG_SET_NEW,
  WT_FINISH_FETCH_DATA,
  WT_PENDING_FETCH_DATA,
  WT_SUCCESS_FETCH_DATA,
} from './actions/actions';
import { NotesActions } from './actions/actionsCreatorsTypes';
import { NotesState } from './types';

const initNotes = () => {
  const initialNotes = localStorage.getItem('userNotes');
  return initialNotes === null ? [] : JSON.parse(initialNotes);
};

const initialState: NotesState = {
  data: initNotes(),
  loading: false,
  newMessage: undefined,
};

export function reducer(state = initialState, actions?: NotesActions): NotesState {
  switch (actions?.type) {
    case WT_PENDING_FETCH_DATA:
      return { ...state, loading: true };
    case WT_SUCCESS_FETCH_DATA:
      return { ...state, data: [...state.data, actions.payload] };
    case WT_FINISH_FETCH_DATA:
      return { ...state, loading: false };
    case MSG_SET_NEW:
      return { ...state, newMessage: actions.payload };

    default:
      return state;
  }
}
