'use client';

import React, { useState } from 'react';
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
import type { VaultMemberModelDto } from '@shared/modules/vaults/models/vault-member.model.dto';

export type AvatarMultiSelectProps = {
  allMembers: VaultMemberModelDto[];
  value: VaultMemberModelDto[];
  label?: string;
  onChange: (next: VaultMemberModelDto[]) => void;
};

export default function AvatarMultiSelect(
  props: AvatarMultiSelectProps
): JSX.Element {
  const [selectedMembers, setSelectedMembers] = useState<VaultMemberModelDto[]>(
    props.allMembers
  );

  const onChange = (members: VaultMemberModelDto[]): void => {
    setSelectedMembers([...members]);
    props.onChange(members);
  };

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={props.allMembers}
      value={props.value}
      onChange={(_, next): void => onChange(next)}
      getOptionLabel={(option): string => option.name ?? option.email}
      isOptionEqualToValue={(o, v): boolean => o.email === v.email}
      renderInput={(params): JSX.Element => {
        if (selectedMembers.length === 0)
          return (
            <TextField
              {...params}
              label={props.label ?? 'Select members'}
              placeholder="Search users"
              helperText="Only you will have access to this vault"
              error={true}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'warning.main',
                  },
                },
                '& .MuiInputLabel-root.Mui-error': {
                  color: 'warning.main',
                },
                '& .MuiFormHelperText-root.Mui-error': {
                  color: 'warning.main',
                },
              }}
            />
          );
        else
          return (
            <TextField
              {...params}
              label={props.label ?? 'Select members'}
              placeholder="Search users"
              helperText="Click to select members"
            />
          );
      }}
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
