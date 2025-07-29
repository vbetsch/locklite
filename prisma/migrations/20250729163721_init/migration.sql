-- CreateTable
CREATE TABLE "Vault" (
    "id" TEXT NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "secret" VARCHAR(255) NOT NULL,

    CONSTRAINT "Vault_pkey" PRIMARY KEY ("id")
);
