import { Note } from '../../../components/NoteCard/types';
import {
  WT_PENDING_FETCH_DATA,
  WT_FAILED_FETCH_DATA,
  WT_FINISH_FETCH_DATA,
  WT_SUCCESS_FETCH_DATA,
  MSG_SET_NEW,
} from './actions';

export interface WorldtimePendingFetchList {
  type: typeof WT_PENDING_FETCH_DATA;
}
export interface WorldtimeSuccessFetchList {
  type: typeof WT_SUCCESS_FETCH_DATA;
  payload: Note;
}
export interface WorldtimeFaliedFetchList {
  type: typeof WT_FAILED_FETCH_DATA;
}

export interface WorldtimeFinishFetchList {
  type: typeof WT_FINISH_FETCH_DATA;
}

export interface MessageSetNew {
  type: typeof MSG_SET_NEW;
  payload: string;
}

export type NotesActions =
  | WorldtimePendingFetchList
  | WorldtimeSuccessFetchList
  | WorldtimeFaliedFetchList
  | WorldtimeFinishFetchList
  | MessageSetNew;
