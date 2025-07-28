import type { Metadata } from 'next';
import type { JSX } from 'react';
import React from 'react';
import ThemeRegistry from '@ui/providers/ThemeRegistry';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import PageContainer from '@ui/components/common/PageContainer';

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
    // eslint-disable-next-line no-restricted-syntax
    <html lang="en">
      {/* eslint-disable-next-line no-restricted-syntax */}
      <body>
        <ThemeRegistry>
          <AppBar position="static" component="header">
            <Toolbar>
              <Typography variant="h6">Locklite</Typography>
            </Toolbar>
          </AppBar>
          <Container component="main" maxWidth="md" sx={{ flexGrow: 1, py: 4 }}>
            <PageContainer>{children}</PageContainer>
          </Container>
          <Box
            component="footer"
            sx={{
              py: 2,
              textAlign: 'center',
            }}
          >
            © {new Date().getFullYear()} Locklite
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
