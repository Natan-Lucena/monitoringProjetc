/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `professors` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "monitorias" ALTER COLUMN "alunosCadastrados" SET DEFAULT 0,
ALTER COLUMN "obs" DROP NOT NULL;

-- AlterTable
ALTER TABLE "monitors" ALTER COLUMN "nota" SET DEFAULT 10,
ALTER COLUMN "totalDeAvaliacoes" SET DEFAULT 0,
ALTER COLUMN "badges" DROP NOT NULL;

-- AlterTable
ALTER TABLE "professors" ALTER COLUMN "monitoresId" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "cadeiras" DROP NOT NULL,
ALTER COLUMN "avaliacaoPendente" SET DEFAULT false,
ALTER COLUMN "ultimaAulaId" DROP NOT NULL,
ALTER COLUMN "ultimaAulaMonitor" DROP NOT NULL,
ALTER COLUMN "active" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "professors_id_key" ON "professors"("id");
