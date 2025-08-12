'use client';

import React from 'react';
import type { JSX } from 'react';
import {
  Autocomplete,
  Checkbox,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@mui/material';
import type { UserModelDto } from '@shared/dto/models/user.model.dto';
import ColorfulLetterAvatar from '@ui/components/avatars/ColorfulLetterAvatar';
import VaultCardMembers from '@ui/modules/vaults/components/atoms/VaultCardMembers';

export type AvatarMultiSelectProps = {
  readonly allUsers: readonly UserModelDto[];
  readonly value: Omit<UserModelDto, 'id'>[];
  readonly label?: string;
  readonly onChange: (next: Omit<UserModelDto, 'id'>[]) => void;
};

export default function AvatarMultiSelect(
  props: AvatarMultiSelectProps
): JSX.Element {
  const { allUsers, value, onChange, label } = props;

  const selectedEmails: readonly string[] = React.useMemo<readonly string[]>(
    () => value.map((u: Omit<UserModelDto, 'id'>): string => u.email),
    [value]
  );

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={allUsers}
      value={value}
      onChange={(_, next: Omit<UserModelDto, 'id'>[]): void => onChange(next)}
      getOptionLabel={(option: Omit<UserModelDto, 'id'>): string =>
        option.name ?? option.email
      }
      isOptionEqualToValue={(
        o: Omit<UserModelDto, 'id'>,
        v: Omit<UserModelDto, 'id'>
      ): boolean => o.email === v.email}
      renderInput={(params): JSX.Element => (
        <TextField
          {...params}
          label={label ?? 'Select members'}
          placeholder="Search users"
        />
      )}
      renderOption={(optionProps, option): JSX.Element => {
        const checked: boolean = selectedEmails.includes(option.email);
        return (
          <ListItem {...optionProps} key={option.email} sx={{ gap: 1 }}>
            <Checkbox key={option.email} checked={checked} />
            <ListItemAvatar key={option.email}>
              <ColorfulLetterAvatar
                key={option.email}
                userName={option.name || null}
              />
            </ListItemAvatar>
            <ListItemText
              key={option.email}
              primary={option.name ?? option.email}
              secondary={option.email}
            />
          </ListItem>
        );
      }}
      renderValue={(selected): JSX.Element => (
        <VaultCardMembers
          maxMembers={3}
          members={selected}
          clickOnMembers={() => onChange(selected)}
        />
      )}
    />
  );
}
