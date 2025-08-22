export enum BusinessErrorCodeEnum {
  // --- Vaults ---
  VAULT_ALREADY_EXISTS = 'L-409-VAE',
  VAULT_LABEL_TOO_LONG = 'L-422-VLTL',
  VAULT_NOT_FOUND = 'L-404-VNF',

  // --- Users ---
  USER_ALREADY_EXISTS = 'L-409-UAE',
  USERS_NOT_FOUND = 'L-404-UNF',

  // --- Others ---
  IMPOSSIBLE_CASE = 'L-500-0IC',
}
