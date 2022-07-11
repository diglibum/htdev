import React from 'react';
import { Container, Grid } from '@mui/material';
import { MenuTabs } from '../../components/MenuTabs';
import { NoteCard } from '../../components/NoteCard';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hook';
import { Footer } from './modules/Footer/Footer';

export const AllNotesPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const notes = useAppSelector((state) => state.notes.data);
  const notesOnPage = useAppSelector((state) => state.settings.notesOnPage);
  const page = parseInt(query.get('page') || '1', 10);

  const getNoteCardList = () =>
    notes
      .slice((page - 1) * notesOnPage, page * notesOnPage)
      .map((note, index) => (
        <NoteCard noteData={note} noteIndex={(page - 1) * notesOnPage + index} key={index} />
      ));

  return (
    <Container maxWidth="md">
      <MenuTabs />
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {getNoteCardList()}
      </Grid>
      <Footer page={page} notesCount={notes.length} notesOnPage={notesOnPage} />
    </Container>
  );
};
