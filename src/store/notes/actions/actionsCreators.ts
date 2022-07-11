import {
  MessageSetNew,
  WorldtimeFaliedFetchList,
  WorldtimeFinishFetchList,
  WorldtimePendingFetchList,
  WorldtimeSuccessFetchList,
} from './actionsCreatorsTypes';
import {
  MSG_SET_NEW,
  WT_FAILED_FETCH_DATA,
  WT_FINISH_FETCH_DATA,
  WT_PENDING_FETCH_DATA,
  WT_SUCCESS_FETCH_DATA,
} from './actions';
import { WorldtimeActionCreator, WorldtimeThunkDispatch } from '../types';
import { Note } from '../../../components/NoteCard/types';
import { showNotificationWithTimeout } from '../../notification/actions/action-creators';

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

export const messageSetNew = (message: string): MessageSetNew => ({
  type: MSG_SET_NEW,
  payload: message,
});

export const addNewNoteToList: WorldtimeActionCreator =
  (timezone: string, signature: string, message: string) =>
  async (dispatch: WorldtimeThunkDispatch, _1, { api }) => {
    try {
      dispatch(worldtimeStartFetchList());
      dispatch(messageSetNew(message));
      const { data, status } = await api.timezones.getWorldtime(`/${timezone}`);

      if (data !== null && status < 300) {
        const note: Note = {
          text: message,
          sign: signature,
          tz: timezone,
          date: data,
        };
        dispatch(worldtimeSuccesFetchList(note));
        dispatch(messageSetNew(''));
        dispatch(
          showNotificationWithTimeout({
            type: 'success',
            title: 'Запись успешно сохранена',
            text: 'Разработчики молодцы!',
          }),
        );
      }
    } catch (e) {
      dispatch(
        showNotificationWithTimeout({
          type: 'error',
          title: 'Не удалось сохранить данные',
          text: 'Мы не виноваты. Проверьте Ваше соединение с интернетом',
        }),
      );
      dispatch(worldtimeFailedFetchList());
    } finally {
      dispatch(worldtimeFinishFetchList());
    }
  };
