import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  SelectChangeEvent,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import { MenuTabs } from '../../components/MenuTabs';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchTimezonesListData } from '../../store/timezones';
import { fetchWorldtimeListData } from '../../store/worldtime';
import { worldtimeSuccesFetchList } from '../../store/worldtime/actions/actionsCreators';

export const HomePage = () => {
  const timezones = useAppSelector((state) => state.timezones.data);
  const isLoading = useAppSelector((state) => state.timezones.loading);
  const notes = useAppSelector((state) => state.notes.data);
  const isNotesAdded = useAppSelector((state) => state.notes.loading);

  const dispatch = useAppDispatch();
  const [record, setRecord] = useState('');
  const [signature, setSignature] = useState('');
  const [signatureErrorText, setSignatureErrorText] = useState<string | undefined | null>();
  const [recordErrorText, setRecordErrorText] = useState<string | undefined | null>();
  const [timezone, setTimezone] = useState(0);

  const signatureValidate = (value: string) => {
    const pattern = /^[A-Zа-яё0-9 \.]{1,}$/gi;

    if (value.length < 3) return setSignatureErrorText('Подпись должна быть длиннее 3 символов');
    if (value.length > 100) return setSignatureErrorText('Подпись должна быть короче 100 символов');
    if (!pattern.test(value))
      return setSignatureErrorText('Подпись может содержать только буквы, цифры, пробел и точку');
    else return setSignatureErrorText(null);
  };

  const recordValidate = (value: string) => {
    if (value.trim().length < 1) return setRecordErrorText('Запись не может быть пустой');
    else return setRecordErrorText(null);
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

  useEffect(() => {
    const allNotes = localStorage.getItem('allNotes');
    if (allNotes) {
      dispatch(worldtimeSuccesFetchList(JSON.parse(allNotes)));
    }
  });

  const handleRecordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    recordValidate(value);
    setRecord(value);
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
      dispatch(fetchWorldtimeListData(timezones[timezone], signature, record));
    }
  };

  useEffect(() => {
    localStorage.setItem('userNotes', JSON.stringify(notes));
  }, [notes]);

  const button = (
    <Button
      type="submit"
      form="createNoteForm"
      variant="contained"
      disabled={isLoading || !(signatureErrorText === null) || !(recordErrorText === null)}
      endIcon={<SendIcon />}
    >
      Создать
    </Button>
  );

  const loadingButton = (
    <LoadingButton loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">
      Сохраняем...
    </LoadingButton>
  );

  return (
    <Container maxWidth="md">
      <MenuTabs />
      <form onSubmit={handleFormSubmit} id="createNoteForm">
        <Grid container mt={3} spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="record"
              label="Запись"
              fullWidth
              multiline
              value={record}
              error={Boolean(recordErrorText)}
              helperText={recordErrorText}
              onChange={handleRecordChange}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              id="signature"
              label="Подпись"
              required
              fullWidth
              value={signature}
              error={Boolean(signatureErrorText)}
              helperText={signatureErrorText}
              onChange={handleSignatureChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              label="Точное время по"
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
            {!isNotesAdded ? button : loadingButton}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
