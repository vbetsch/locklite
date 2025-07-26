import type { Metadata } from 'next';
import './globals.css';
import type { JSX } from 'react';
import React from 'react';
import ThemeRegistry from '@ui/providers/ThemeRegistry';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

export const metadata: Metadata = {
  title: {
    default: 'LockLite',
    template: '%s | LockLite',
  },
  description: 'The best secure password manager',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <ThemeRegistry>
        <Box className="foobarbaz">
          <AppBar position="static" component="header">
            <Toolbar>
              <Typography variant="h6">My Application</Typography>
            </Toolbar>
          </AppBar>
          <Container component="main" maxWidth="md" sx={{ flexGrow: 1, py: 4 }}>
            {children}
          </Container>
          <Box
            component="footer"
            sx={{
              py: 2,
              textAlign: 'center',
              bgcolor: 'grey.100',
            }}
          >
            © {new Date().getFullYear()} MonSite
          </Box>
        </Box>
      </ThemeRegistry>
    </>
  );
}
