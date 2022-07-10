import { ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Timezone, WorldTime } from '../../api/types';
import { Note } from '../../components/NoteCard/types';
import { AppState, ThunkExtraArgument } from '../types';
import { WorldtimeActions } from './actions/actionsCreatorsTypes';

export type WorldtimeState = {
  data: Note[];
  loading: boolean;
};
export type WorldtimeThunkDispatch = ThunkDispatch<AppState, ThunkExtraArgument, WorldtimeActions>;

export type WorldtimeActionCreator = ActionCreator<
  ThunkAction<Promise<WorldtimeActions | void>, AppState, ThunkExtraArgument, WorldtimeActions>
>;
