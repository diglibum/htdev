import React, { ChangeEvent, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { MenuTabs } from '../../components/MenuTabs';
import { NoteCard } from '../../components/NoteCard';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hook';
import { Footer } from './modules/Footer/Footer';

export const AllRecordsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const notes = useAppSelector((state) => state.notes.data);
  const [limit, setLimit] = useState(6);
  const page = parseInt(query.get('page') || '1', 10);

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numberValue = Number(value);

    if (numberValue && numberValue !== NaN) {
      setLimit(numberValue);
    } else {
      setLimit(0);
    }
  };

  const noteCardList = notes
    .slice((page - 1) * limit, page * limit)
    .map((note, index) => (
      <NoteCard noteData={note} noteIndex={(page - 1) * limit + index} key={index} />
    ));

  return (
    <Container maxWidth="md">
      <MenuTabs />
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {noteCardList}
      </Grid>
      <Footer
        page={page}
        notesCount={notes.length}
        limit={limit}
        onChangeHandler={handleLimitChange}
      />
    </Container>
  );
};
