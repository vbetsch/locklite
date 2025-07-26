import type { JSX } from 'react';
import { Button } from '@mui/material';
import ThemeSwitcher from '@ui/components/common/atoms/ThemeSwitcher';

export default function Home(): JSX.Element {
  return (
    <div className="home">
      <p>homepage</p>
      <Button variant="contained">Bonjour chef</Button>
      <ThemeSwitcher />
    </div>
  );
}
