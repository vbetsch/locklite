-- CreateTable
CREATE TABLE "MasterAccount" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MasterAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credential" (
    "id" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "masterAccountId" TEXT NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MasterAccount_email_key" ON "MasterAccount"("email");

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_masterAccountId_fkey" FOREIGN KEY ("masterAccountId") REFERENCES "MasterAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
