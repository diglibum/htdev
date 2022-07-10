import { GetWorldtimeResponse } from '../../api/types';

export type Note = {
  text: string;
  sign: string;
  tz: string;
  date: Record<string, any>;
};

export type NoteCardProps = {
  noteData: Note;
  noteIndex: number;
};
