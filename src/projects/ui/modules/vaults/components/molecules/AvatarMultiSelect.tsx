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
  readonly onChange: (next: readonly Omit<UserModelDto, 'id'>[]) => void;
};

export default function AvatarMultiSelect(
  props: AvatarMultiSelectProps
): JSX.Element {
  const { allUsers, value, onChange, label } = props;

  const selectedEmails: readonly string[] = React.useMemo<readonly string[]>(
    () => value.map((u: Omit<UserModelDto, 'id'>): string => u.email),
    [value]
  );

  const normalizedAllUsers: readonly Omit<UserModelDto, 'id'>[] = React.useMemo<
    readonly Omit<UserModelDto, 'id'>[]
  >(
    () =>
      allUsers.map(
        (u: UserModelDto): Omit<UserModelDto, 'id'> => ({
          email: u.email,
          // eslint-disable-next-line no-undefined
          name: u.name ?? undefined,
        })
      ),
    [allUsers]
  );

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={normalizedAllUsers}
      value={value}
      onChange={(_, next: readonly Omit<UserModelDto, 'id'>[]): void =>
        onChange(next)
      }
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
            <ListItemAvatar>
              <ColorfulLetterAvatar userName={option.name ?? option.email} />
            </ListItemAvatar>
            <ListItemText
              primary={option.name ?? option.email}
              secondary={option.email}
            />
          </ListItem>
        );
      }}
      renderTags={(selected): JSX.Element => (
        <VaultCardMembers
          maxMembers={3}
          members={selected}
          clickOnMembers={() => onChange(selected)}
        />
      )}
    />
  );
}
