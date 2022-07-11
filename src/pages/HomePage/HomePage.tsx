import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';

import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  SelectChangeEvent,
  AlertTitle,
  Alert,
  InputLabel,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import { MenuTabs } from '../../components/MenuTabs';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchTimezonesListData } from '../../store/timezones';
import { addNewNoteToList } from '../../store/notes';
import { messageSetNew } from '../../store/notes/actions/actionsCreators';

export const HomePage = () => {
  const timezones = useAppSelector((state) => state.timezones.data);
  const isLoading = useAppSelector((state) => state.timezones.loading);
  const notes = useAppSelector((state) => state.notes.data);
  const isNotesAdded = useAppSelector((state) => state.notes.loading);
  const newMessage = useAppSelector((state) => state.notes.newMessage);
  const alerts = useAppSelector((state) => state.notification);

  const dispatch = useAppDispatch();
  const [signature, setSignature] = useState('');
  const [signatureErrorText, setSignatureErrorText] = useState<string | undefined | null>();
  const [messageErrorText, setMessageErrorText] = useState<string | undefined | null>();
  const [timezone, setTimezone] = useState(0);

  const signatureValidate = (value: string) => {
    const pattern = /^[A-Zа-яё0-9 \.]{1,}$/gi;

    if (value.length < 3) return setSignatureErrorText('Подпись должна быть длиннее 3 символов');
    if (value.length > 100) return setSignatureErrorText('Подпись должна быть короче 100 символов');
    if (!pattern.test(value))
      return setSignatureErrorText('Подпись может содержать только буквы, цифры, пробел и точку');
    else return setSignatureErrorText(null);
  };

  const messageValidate = (value: string) => {
    if (value.trim().length < 1) return setMessageErrorText('Запись не может быть пустой');
    else return setMessageErrorText(null);
  };

  useEffect(() => {
    dispatch(fetchTimezonesListData());
  }, [dispatch]);

  useEffect(() => {
    const userTimesone = localStorage.getItem('userTimezone');
    const userSignature = localStorage.getItem('userSignature');

    if (userTimesone && timezones !== null) {
      const index = timezones.findIndex((zone) => zone === userTimesone);
      if (index > 0) {
        setTimezone(index);
      }
    }

    if (userSignature) {
      signatureValidate(userSignature);
      setSignature(userSignature);
    }
  }, [timezones]);

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(messageSetNew(value));
  };

  const handleSignatureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    signatureValidate(value);

    localStorage.setItem('userSignature', value);
    setSignature(value);
  };

  const handleTimezoneSelect = (event: SelectChangeEvent<number>) => {
    const value = event.target.value as number;
    if (timezones !== null && value > 0) {
      localStorage.setItem('userTimezone', timezones[value]);
      setTimezone(value);
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (timezones && timezone) {
      dispatch(addNewNoteToList(timezones[timezone], signature, newMessage));
    }
  };

  useEffect(() => {
    localStorage.setItem('userNotes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (newMessage !== undefined) {
      messageValidate(newMessage);
    }
  }, [newMessage]);

  const getButton = () => (
    <Button
      type="submit"
      form="createNoteForm"
      variant="contained"
      disabled={isLoading || !(signatureErrorText === null) || !(messageErrorText === null)}
      endIcon={<SendIcon />}
    >
      Создать
    </Button>
  );

  const getLoadingButton = () => (
    <LoadingButton loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">
      Сохраняем...
    </LoadingButton>
  );

  const getAlertBlock = useCallback(() => {
    const { notifications } = alerts;
    if (notifications.length > 0) {
      const { type, title, text } = notifications[0];
      return (
        <Alert severity={type} sx={{ mt: 3 }}>
          <AlertTitle>{title}</AlertTitle>
          {text}
        </Alert>
      );
    } else return null;
  }, [alerts]);

  return (
    <Container maxWidth="md">
      <MenuTabs />
      {getAlertBlock()}
      <form onSubmit={handleFormSubmit} id="createNoteForm">
        <Grid container mt={3} spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="userMessage"
              label="Запись"
              InputLabelProps={{ shrink: true }}
              fullWidth
              multiline
              value={newMessage}
              error={Boolean(messageErrorText)}
              helperText={messageErrorText}
              onChange={handleMessageChange}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              id="signature"
              label="Подпись"
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
              value={signature}
              error={Boolean(signatureErrorText)}
              helperText={signatureErrorText}
              onChange={handleSignatureChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InputLabel
              shrink={true}
              id="select-label"
              variant="outlined"
              sx={{
                position: 'absolute',
                backgroundColor: '#fff',
                padding: '0 3px',
                marginLeft: '-5px',
              }}
            >
              Точное время по
            </InputLabel>
            <Select
              labelId="select-label"
              value={timezone}
              fullWidth
              onChange={handleTimezoneSelect}
            >
              {timezones?.map((zone, index) => (
                <MenuItem key={index} value={index}>
                  {zone}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid container item xs={12} justifyContent="flex-end">
            {!isNotesAdded ? getButton() : getLoadingButton()}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
