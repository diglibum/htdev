import { SET_NOTES_ON_PAGE_COUNT } from './actions';

export interface SetNotesOnPage {
  type: typeof SET_NOTES_ON_PAGE_COUNT;
  payload: number;
}

export type SettingsActions = SetNotesOnPage;
