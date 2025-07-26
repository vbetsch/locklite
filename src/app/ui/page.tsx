import type { JSX } from 'react';
import { Button } from '@mui/material';

export default function Home(): JSX.Element {
  return (
    <div className="home">
      <p>homepage</p>
      <Button variant="contained">Bonjour chef</Button>
    </div>
  );
}
