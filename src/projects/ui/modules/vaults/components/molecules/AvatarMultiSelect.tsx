'use client';

import React from 'react';
import type { JSX, MouseEvent } from 'react';
import {
  Avatar,
  AvatarGroup,
  Autocomplete,
  Box,
  Checkbox,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  TextField,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/PersonAddAlt';
import type { UserModelDto } from '@shared/dto/models/user.model.dto';
import ColorfulLetterAvatar from '@ui/components/avatars/ColorfulLetterAvatar';

export type AvatarMultiSelectProps = {
  readonly allUsers: readonly UserModelDto[];
  readonly value: Omit<UserModelDto, 'id'>[];
  readonly maxDisplayed?: number;
  readonly label?: string;
  readonly disabled?: boolean;
  readonly onChange: (next: readonly Omit<UserModelDto, 'id'>[]) => void;
};

export default function AvatarMultiSelect(
  props: AvatarMultiSelectProps
): JSX.Element {
  const { allUsers, value, onChange, maxDisplayed, label, disabled } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>): void => {
    if (disabled === true) {
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open: boolean = Boolean(anchorEl);

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
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Tooltip title={label ?? 'Members'}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: disabled === true ? 'not-allowed' : 'pointer',
            '&:hover .MuiAvatarGroup-avatar': {
              outline: disabled === true ? 'none' : '2px solid',
              outlineColor: 'primary.main',
            },
          }}
          onClick={handleOpen}
        >
          <AvatarGroup
            max={maxDisplayed ?? 3}
            sx={{ '.MuiAvatar-root': { width: 32, height: 32, fontSize: 14 } }}
          >
            {value.length > 0 ? (
              value.map(
                (member: Omit<UserModelDto, 'id'>): JSX.Element => (
                  <ColorfulLetterAvatar
                    key={member.email}
                    userName={member.name ?? member.email}
                  />
                )
              )
            ) : (
              <Avatar>
                <AddIcon />
              </Avatar>
            )}
          </AvatarGroup>
          <IconButton size="small" disabled={disabled === true}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{ sx: { p: 2, width: 360 } }}
      >
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
                <Checkbox checked={checked} />
                <ListItemAvatar>
                  <ColorfulLetterAvatar
                    userName={option.name ?? option.email}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={option.name ?? option.email}
                  secondary={option.email}
                />
              </ListItem>
            );
          }}
          renderTags={(selected): JSX.Element => (
            <AvatarGroup
              max={6}
              sx={{
                '.MuiAvatar-root': { width: 24, height: 24, fontSize: 12 },
              }}
            >
              {selected.map(
                (s: Omit<UserModelDto, 'id'>): JSX.Element => (
                  <ColorfulLetterAvatar
                    key={s.email}
                    userName={s.name ?? s.email}
                  />
                )
              )}
            </AvatarGroup>
          )}
        />
      </Popover>
    </Box>
  );
}
