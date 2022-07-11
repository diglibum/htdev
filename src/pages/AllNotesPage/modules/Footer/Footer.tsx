import React from 'react';
import {
  Pagination,
  PaginationItem,
  Box,
  Typography,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/hook';
import { notesOnPageCounts } from '../../../../consts';
import { FooterProps } from './types';
import { setNotesOnPage } from '../../../../store/settings/actions/actionsCreators';

export const Footer = (props: FooterProps) => {
  const { page, notesCount, notesOnPage } = props;
  const dispatch = useAppDispatch();

  const countPages = () => {
    if (notesOnPage >= notesCount) return 1;

    let result = Math.round(notesCount / notesOnPage);

    if (notesCount % notesOnPage > 0) result++;
    return result;
  };

  const handleNotesOnPageSelect = (event: SelectChangeEvent<number>) => {
    const { value } = event.target;

    localStorage.setItem('userNotesOnPage', '' + value);
    dispatch(setNotesOnPage(Number(value)));
  };

  const getEmptyNotesBlock = () => (
    <Typography variant="body2" sx={{ mt: 3 }}>
      Записи отсутствуют
    </Typography>
  );

  const getPaginationBlock = () => (
    <Pagination
      count={countPages()}
      showFirstButton
      showLastButton
      page={page}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/notes${item.page === 1 ? '' : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );

  const getNotesOnPageBlock = () => (
    <Select label="Записей на странице" value={notesOnPage} onChange={handleNotesOnPageSelect}>
      {notesOnPageCounts?.map((count, index) => (
        <MenuItem key={index} value={count}>
          {count}
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
        <Typography variant="body2">Записей на странице:&nbsp;</Typography>
        {getNotesOnPageBlock()}
      </Box>
      <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
        {notesCount === 0 ? getEmptyNotesBlock() : getPaginationBlock()}
      </Box>
    </>
  );
};
