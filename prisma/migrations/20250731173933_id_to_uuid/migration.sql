/*
  Warnings:

  - The primary key for the `Vault` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Vault` table. All the data in the column will be lost.
  - The required column `uuid` was added to the `Vault` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Vault" DROP CONSTRAINT "Vault_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
ADD CONSTRAINT "Vault_pkey" PRIMARY KEY ("uuid");
