/*
  Warnings:

  - You are about to drop the column `cadeiras` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "monitorias" ALTER COLUMN "idCadeira" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cadeiras";

-- CreateTable
CREATE TABLE "Cadeira" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Cadeira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cadeirasCadastradas" (
    "id" TEXT NOT NULL,
    "cadeiraId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "cadeirasCadastradas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cadeirasCadastradas" ADD CONSTRAINT "cadeirasCadastradas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cadeirasCadastradas" ADD CONSTRAINT "cadeirasCadastradas_cadeiraId_fkey" FOREIGN KEY ("cadeiraId") REFERENCES "Cadeira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitorias" ADD CONSTRAINT "monitorias_idCadeira_fkey" FOREIGN KEY ("idCadeira") REFERENCES "Cadeira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
