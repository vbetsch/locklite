import type { SxProps, SystemStyleObject } from '@mui/system';
import type { Theme } from '@mui/material/styles';

const AVATAR_SIZE: number = 30;
const FONT_RATIO: number = 0.5;

export const avatarSxStyle: SxProps<Theme> = {
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  fontSize: AVATAR_SIZE * FONT_RATIO,
};

export const avatarSystemStyle: SystemStyleObject<Theme> = {
  ...avatarSxStyle,
};
