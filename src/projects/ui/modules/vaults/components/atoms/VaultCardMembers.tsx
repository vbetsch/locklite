import React from 'react';
import type { JSX } from 'react';
import { AvatarGroup } from '@mui/material';
import ColorfulLetterAvatar from '@ui/components/avatars/ColorfulLetterAvatar';
import type { UserModelDto } from '@shared/dto/models/user.model.dto';
import { avatarSystemStyle } from '@ui/styles/avatar.style';

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
      }}
    >
      {props.members.map(member => (
        <ColorfulLetterAvatar
          key={member.email}
          userName={member.name || null}
        />
      ))}
    </AvatarGroup>
  );
}
