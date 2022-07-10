import { SetNotesOnPage } from './actionsCreatorsTypes';
import { SET_NOTES_ON_PAGE_COUNT } from './actions';

export const setNotesOnPage = (count: number): SetNotesOnPage => ({
  type: SET_NOTES_ON_PAGE_COUNT,
  payload: count,
});
