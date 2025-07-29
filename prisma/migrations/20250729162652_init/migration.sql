-- CreateTable
CREATE TABLE "Vault" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "secret" TEXT NOT NULL,

    CONSTRAINT "Vault_pkey" PRIMARY KEY ("id")
);
