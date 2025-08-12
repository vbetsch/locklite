import React from 'react';
import type { JSX } from 'react';
import { AvatarGroup } from '@mui/material';
import ColorfulLetterAvatar from '@ui/components/avatars/ColorfulLetterAvatar';
import type { UserModelDto } from '@shared/dto/models/user.model.dto';
import { avatarSystemStyle } from '@ui/styles/avatar.style';
import Avatar from '@mui/material/Avatar';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

type VaultCardMembersProps = {
  members: Omit<UserModelDto, 'id'>[];
};

export default function VaultCardMembers(
  props: VaultCardMembersProps
): JSX.Element {
  return (
    <AvatarGroup
      max={3}
      spacing={'medium'}
      sx={{
        '& .MuiAvatarGroup-avatar': avatarSystemStyle,
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      {props.members.length ? (
        props.members.map(member => (
          <ColorfulLetterAvatar
            key={member.email}
            userName={member.name || null}
          />
        ))
      ) : (
        <Avatar>
          <PersonAddAltIcon />
        </Avatar>
      )}
    </AvatarGroup>
  );
}
