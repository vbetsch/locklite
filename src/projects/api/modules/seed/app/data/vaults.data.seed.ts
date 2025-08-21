import type { VaultTypeSeed } from '@api/modules/seed/app/types/vault.type.seed';

export const vaultsDataSeed: Record<string, VaultTypeSeed> = {
  google: { label: 'Google', secret: 'g0ogle' },
  amazon: { label: 'Amazon', secret: 'am4z0n' },
  github: { label: 'Github', secret: 'g1thub_s3cr3t' },
  netflix: { label: 'Netflix', secret: 'n3tfl1x' },
  disneyPlus: { label: 'Disney +', secret: 'disney.plu$' },
  primeVideo: { label: 'Prime Video', secret: 'pr1m3_v1d30' },
  appleTv: { label: 'Apple TV', secret: 'appl3_tv_pass' },
  stackoverflow: { label: 'Stackoverflow', secret: 'st4ck0v3rfl0w' },
  reddit: { label: 'Reddit', secret: 'r3dd1t_p4ss' },
  youtube: { label: 'Youtube', secret: 'y0utub3_cr3at0r' },
};
