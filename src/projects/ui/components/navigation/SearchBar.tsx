import React from 'react';
import type { JSX, Dispatch, SetStateAction } from 'react';
import { TextField } from '@mui/material';

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

export default function SearchBar(props: SearchBarProps): JSX.Element {
  return (
    <TextField
      fullWidth
      label="Search"
      placeholder="Search…"
      value={props.searchTerm}
      onChange={e => props.setSearchTerm(e.target.value)}
    />
  );
}
