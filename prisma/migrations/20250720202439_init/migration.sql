/*
  Warnings:

  - Added the required column `label` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_masterAccountId_fkey";

-- AlterTable
ALTER TABLE "Credential" ADD COLUMN     "label" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_masterAccountId_fkey" FOREIGN KEY ("masterAccountId") REFERENCES "MasterAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
