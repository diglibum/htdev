import { SET_NOTES_ON_PAGE_COUNT } from './actions/actions';
import { SettingsActions } from './actions/actionsCreatorsTypes';
import { SettingsState } from './types';

const initUserNotesOnPage = (): number => {
  const userNotesOnPage = localStorage.getItem('userNotesOnPage');
  return userNotesOnPage === null ? 10 : Number(JSON.parse(userNotesOnPage));
};

const initialState: SettingsState = {
  notesOnPage: initUserNotesOnPage(),
};

export function reducer(state = initialState, actions?: SettingsActions): SettingsState {
  switch (actions?.type) {
    case SET_NOTES_ON_PAGE_COUNT:
      return { ...state, notesOnPage: actions.payload };

    default:
      return state;
  }
}
