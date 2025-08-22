/*
  Warnings:

  - You are about to drop the column `userId` on the `Vault` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Vault" DROP CONSTRAINT "Vault_userId_fkey";

-- DropIndex
DROP INDEX "public"."Vault_userId_idx";

-- AlterTable
ALTER TABLE "public"."Vault" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "public"."VaultMember" (
    "id" TEXT NOT NULL,
    "vaultId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "VaultMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VaultMember_vaultId_idx" ON "public"."VaultMember"("vaultId");

-- CreateIndex
CREATE INDEX "VaultMember_userId_idx" ON "public"."VaultMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VaultMember_vaultId_userId_key" ON "public"."VaultMember"("vaultId", "userId");

-- AddForeignKey
ALTER TABLE "public"."VaultMember" ADD CONSTRAINT "VaultMember_vaultId_fkey" FOREIGN KEY ("vaultId") REFERENCES "public"."Vault"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."VaultMember" ADD CONSTRAINT "VaultMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
