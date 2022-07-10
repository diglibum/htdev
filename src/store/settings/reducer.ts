import { SET_NOTES_ON_PAGE_COUNT } from './actions/actions';
import { SettingsActions } from './actions/actionsCreatorsTypes';
import { SettingsState } from './types';

const initialState: SettingsState = {
  notesOnPage: 10,
};

export function reducer(state = initialState, actions?: SettingsActions): SettingsState {
  switch (actions?.type) {
    case SET_NOTES_ON_PAGE_COUNT:
      return { ...state, notesOnPage: actions.payload };

    default:
      return state;
  }
}
