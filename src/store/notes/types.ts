import { ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Note } from '../../components/NoteCard/types';
import { AppState, ThunkExtraArgument } from '../types';
import { NotesActions } from './actions/actionsCreatorsTypes';

export type NotesState = {
  data: Note[];
  loading: boolean;
  newMessage: string | undefined;
};
export type WorldtimeThunkDispatch = ThunkDispatch<AppState, ThunkExtraArgument, NotesActions>;

export type WorldtimeActionCreator = ActionCreator<
  ThunkAction<Promise<NotesActions | void>, AppState, ThunkExtraArgument, NotesActions>
>;
