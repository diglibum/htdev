import { Timezone } from '../../../api/types';
import {
  TZ_PENDING_FETCH_LIST_DATA,
  TZ_FAILED_FETCH_LIST_DATA,
  TZ_FINISH_FETCH_LIST_DATA,
  TZ_SUCCESS_FETCH_LIST_DATA,
} from './actions';

export interface TimezonesPendingFetchList {
  type: typeof TZ_PENDING_FETCH_LIST_DATA;
}
export interface TimezonesSuccessFetchList {
  type: typeof TZ_SUCCESS_FETCH_LIST_DATA;
  payload: Timezone[] | null;
}
export interface TimezonesFaliedFetchList {
  type: typeof TZ_FAILED_FETCH_LIST_DATA;
}

export interface TimezonesFinishFetchList {
  type: typeof TZ_FINISH_FETCH_LIST_DATA;
}

export type TimezonesActions =
  | TimezonesPendingFetchList
  | TimezonesSuccessFetchList
  | TimezonesFaliedFetchList
  | TimezonesFinishFetchList;
