// import { showNotificationWithTimeout } from 'store/notification/actions/action-creators';
import { GetTimezoneResponse } from '../../../api/types';
import {
  TimezonesFaliedFetchList,
  TimezonesFinishFetchList,
  TimezonesPendingFetchList,
  TimezonesSuccessFetchList,
} from './actionsCreatorsTypes';
import {
  TZ_FAILED_FETCH_LIST_DATA,
  TZ_FINISH_FETCH_LIST_DATA,
  TZ_PENDING_FETCH_LIST_DATA,
  TZ_SUCCESS_FETCH_LIST_DATA,
} from './actions';
import { TimezonesActionCreator, TimezonesThunkDispatch } from '../types';
import { showNotificationWithTimeout } from '../../notification/actions/action-creators';

export const timezonesStartFetchList = (): TimezonesPendingFetchList => ({
  type: TZ_PENDING_FETCH_LIST_DATA,
});

export const timezonesSuccesFetchList = (data: GetTimezoneResponse): TimezonesSuccessFetchList => ({
  type: TZ_SUCCESS_FETCH_LIST_DATA,
  payload: data,
});

export const timezonesFailedFetchList = (): TimezonesFaliedFetchList => ({
  type: TZ_FAILED_FETCH_LIST_DATA,
});

export const timezonesFinishFetchList = (): TimezonesFinishFetchList => ({
  type: TZ_FINISH_FETCH_LIST_DATA,
});

export const fetchTimezonesListData: TimezonesActionCreator =
  () =>
  async (dispatch: TimezonesThunkDispatch, _1, { api }) => {
    try {
      dispatch(timezonesStartFetchList());
      const { data, status } = await api.timezones.getTimezones();
      if (status < 300) {
        dispatch(timezonesSuccesFetchList(data));
      }
    } catch (e) {
      dispatch(
        showNotificationWithTimeout({
          type: 'error',
          title: 'Не удалось получить данные',
          text: 'Попробуйте обновить страницу',
        }),
      );
      dispatch(timezonesFailedFetchList());
    } finally {
      dispatch(timezonesFinishFetchList());
    }
  };
