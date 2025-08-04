import React from 'react';
import type { JSX } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import VaultCardContentLine from '@ui/components/vaults/atoms/VaultCardContentLine';
import type { VaultModelDto } from '@shared/dto/models/vault.model.dto';

type VaultCardProps = {
  vault: VaultModelDto;
  deleteVault: (vault: VaultModelDto) => void;
};

export default function VaultCard(props: VaultCardProps): JSX.Element {
  return (
    <Card
      sx={{
        bgcolor: 'background.paper',
      }}
    >
      <CardHeader title={props.vault.label} />
      <CardContent>
        <VaultCardContentLine vaultSecret={props.vault.secret} />
      </CardContent>
      <CardActions>
        <Button color={'error'} onClick={() => props.deleteVault(props.vault)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
