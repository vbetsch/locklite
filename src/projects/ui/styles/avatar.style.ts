import type { SxProps } from '@mui/system';
import type { Theme } from '@mui/material/styles';

const AVATAR_SIZE: number = 30;

export const avatarStyle: SxProps<Theme> = {
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  fontSize: AVATAR_SIZE * 0.5,
};
