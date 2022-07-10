import React, { ChangeEvent, useCallback, useState } from 'react';
import { Pagination, PaginationItem, Box, Typography, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

type FooterProps = {
  page: number;
  notesCount: number;
  limit: number;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Footer = (props: FooterProps) => {
  const { page, notesCount, limit, onChangeHandler } = props;

  const countPages = useCallback(() => {
    let result = Math.round(notesCount / limit);
    if (notesCount % limit > limit) result++;
    return result;
  }, [limit]);

  const emptyNotesBlock = (
    <Typography variant="body2" sx={{ mt: 3 }}>
      Записи отсутствуют
    </Typography>
  );

  const paginationBlock = (
    <Pagination
      count={countPages()}
      showFirstButton
      showLastButton
      page={page}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/records${item.page === 1 ? '' : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
        <Typography variant="body2">Записей на странице:&nbsp;</Typography>
        <TextField
          id="notesOnPage"
          required
          value={limit}
          size="small"
          sx={{ width: '50px' }}
          onChange={onChangeHandler}
        />
      </Box>
      <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
        {notesCount === 0 ? emptyNotesBlock : paginationBlock}
      </Box>
    </>
  );
};
