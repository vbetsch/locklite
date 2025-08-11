import React from 'react';
import type { JSX } from 'react';
import { AvatarGroup } from '@mui/material';
import ColorfulLetterAvatar from '@ui/components/avatars/ColorfulLetterAvatar';
import type { UserModelDto } from '@shared/dto/models/user.model.dto';

type VaultCardMembersProps = {
  members: Omit<UserModelDto, 'id'>[];
};

export default function VaultCardMembers(
  props: VaultCardMembersProps
): JSX.Element {
  const avatarSize: number = 30;

  return (
    <AvatarGroup
      max={3}
      spacing={'medium'}
      sx={{
        '& .MuiAvatarGroup-avatar': {
          width: avatarSize,
          height: avatarSize,
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          fontSize: avatarSize * 0.5,
        },
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
