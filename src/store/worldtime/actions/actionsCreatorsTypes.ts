import { Note } from '../../../components/NoteCard/types';
import {
  WT_PENDING_FETCH_DATA,
  WT_FAILED_FETCH_DATA,
  WT_FINISH_FETCH_DATA,
  WT_SUCCESS_FETCH_DATA,
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

export type WorldtimeActions =
  | WorldtimePendingFetchList
  | WorldtimeSuccessFetchList
  | WorldtimeFaliedFetchList
  | WorldtimeFinishFetchList;
