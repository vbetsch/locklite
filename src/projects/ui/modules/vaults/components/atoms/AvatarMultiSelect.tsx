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
import ColorfulLetterAvatar from '@ui/components/avatars/ColorfulLetterAvatar';
import VaultCardMembers from '@ui/modules/vaults/components/atoms/VaultCardMembers';
import type { VaultMemberModelDto } from '@shared/modules/vaults/vault-member.model.dto';

export type AvatarMultiSelectProps = {
  allMembers: VaultMemberModelDto[];
  value: VaultMemberModelDto[];
  label?: string;
  onChange: (next: VaultMemberModelDto[]) => void;
};

export default function AvatarMultiSelect(
  props: AvatarMultiSelectProps
): JSX.Element {
  const { allMembers, value, onChange, label } = props;

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={allMembers}
      value={value}
      onChange={(_, next): void => onChange(next)}
      getOptionLabel={(option): string => option.name ?? option.email}
      isOptionEqualToValue={(o, v): boolean => o.email === v.email}
      renderInput={(params): JSX.Element => (
        <TextField
          {...params}
          label={label ?? 'Select members'}
          placeholder="Search users"
        />
      )}
      renderOption={(optionProps, option, { selected }): JSX.Element => {
        const { key, ...rest } = optionProps;
        return (
          <ListItem key={key as React.Key} {...rest} sx={{ gap: 1 }}>
            <Checkbox
              checked={selected}
              onMouseDown={(e): void => e.preventDefault()}
            />
            <ListItemAvatar>
              <ColorfulLetterAvatar userName={option.name ?? null} />
            </ListItemAvatar>
            <ListItemText
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
