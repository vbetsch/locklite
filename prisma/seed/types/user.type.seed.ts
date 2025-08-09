import {VaultTypeSeed} from "@prisma/seed/types/vault.type.seed";

export type UserTypeSeed = {
  readonly name: string | null;
  readonly email: string;
  readonly passwordPlain: string;
  readonly vaults: ReadonlyArray<VaultTypeSeed>;
}
