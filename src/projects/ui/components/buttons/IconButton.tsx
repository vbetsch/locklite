import React from 'react';
import type { JSX } from 'react';
import { Button, Typography } from '@mui/material';

type IconButtonProps = {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
};

export default function IconButton(props: IconButtonProps): JSX.Element {
  return (
    <Button
      startIcon={props.icon}
      variant="contained"
      sx={{
        minWidth: { xs: 56, sm: 150 },
        '& .MuiButton-startIcon': {
          mr: { xs: 0, sm: 1 },
        },
      }}
      onClick={props.onClick}
    >
      <Typography
        variant={'button'}
        sx={{
          display: { xs: 'none', sm: 'inline' },
        }}
      >
        {props.text}
      </Typography>
    </Button>
  );
}
