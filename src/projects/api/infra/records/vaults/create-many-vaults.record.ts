export type CreateManyVaultsRecord = {
  userId: string;
  vaults: ReadonlyArray<{
    label: string;
    secret: string;
  }>;
};
