// import { showNotificationWithTimeout } from 'store/notification/actions/action-creators';
import { GetWorldtimeResponse } from '../../../api/types';
import {
  WorldtimeFaliedFetchList,
  WorldtimeFinishFetchList,
  WorldtimePendingFetchList,
  WorldtimeSuccessFetchList,
} from './actionsCreatorsTypes';
import {
  WT_FAILED_FETCH_DATA,
  WT_FINISH_FETCH_DATA,
  WT_PENDING_FETCH_DATA,
  WT_SUCCESS_FETCH_DATA,
} from './actions';
import { WorldtimeActionCreator, WorldtimeThunkDispatch } from '../types';
import { Note } from '../../../components/NoteCard/types';

export const worldtimeStartFetchList = (): WorldtimePendingFetchList => ({
  type: WT_PENDING_FETCH_DATA,
});

export const worldtimeSuccesFetchList = (data: Note): WorldtimeSuccessFetchList => ({
  type: WT_SUCCESS_FETCH_DATA,
  payload: data,
});

export const worldtimeFailedFetchList = (): WorldtimeFaliedFetchList => ({
  type: WT_FAILED_FETCH_DATA,
});

export const worldtimeFinishFetchList = (): WorldtimeFinishFetchList => ({
  type: WT_FINISH_FETCH_DATA,
});

export const fetchWorldtimeListData: WorldtimeActionCreator =
  (timezone: string, signature: string, message: string) =>
  async (dispatch: WorldtimeThunkDispatch, _1, { api }) => {
    try {
      dispatch(worldtimeStartFetchList());
      const { data, status } = await api.timezones.getWorldtime(`/${timezone}`);

      if (data !== null && status < 300) {
        const note: Note = {
          text: message,
          sign: signature,
          tz: timezone,
          date: data,
        };
        dispatch(worldtimeSuccesFetchList(note));
      }
    } catch (e) {
      // dispatch(
      //   showNotificationWithTimeout({
      //     type: 'error',
      //     title: 'Не удалось получить данные',
      //     text: 'Попробуйте обновить страницу',
      //   }),
      // );
      dispatch(worldtimeFailedFetchList());
    } finally {
      dispatch(worldtimeFinishFetchList());
    }
  };
