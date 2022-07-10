import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';
import { NoteCardProps } from './types';

export const NoteCard = (props: NoteCardProps) => {
  const { text, sign } = props.noteData;
  const { datetime } = props.noteData.date;
  const { noteIndex } = props;

  return (
    <Grid item xs={12} sm={6}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {sign}
        </Typography>
        <Box sx={{ mt: 0.5 }}>
          <Typography variant="h6">Заголовок записи {noteIndex + 1}</Typography>
          <Typography variant="body2" color="text.secondary">
            {datetime}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {text}
        </Typography>
      </Paper>
    </Grid>
  );
};
