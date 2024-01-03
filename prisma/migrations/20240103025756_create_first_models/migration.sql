-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isMonitor" BOOLEAN NOT NULL,
    "isProfessor" BOOLEAN NOT NULL,
    "cadeiras" TEXT NOT NULL,
    "avaliacaoPendente" BOOLEAN NOT NULL,
    "ultimaAulaId" TEXT NOT NULL,
    "ultimaAulaMonitor" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professors" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "monitoresId" TEXT[],

    CONSTRAINT "professors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monitors" (
    "id" TEXT NOT NULL,
    "tokenProfessor" TEXT NOT NULL,
    "idCadeira" TEXT NOT NULL,
    "nota" DOUBLE PRECISION NOT NULL,
    "totalDeAvaliacoes" INTEGER NOT NULL,
    "badges" TEXT NOT NULL,

    CONSTRAINT "monitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monitorias" (
    "id" TEXT NOT NULL,
    "idMonitor" TEXT NOT NULL,
    "cadeiraName" TEXT NOT NULL,
    "horarioInicio" TIMESTAMP(3) NOT NULL,
    "horarioFim" TIMESTAMP(3) NOT NULL,
    "alunosCadastrados" INTEGER NOT NULL,
    "sala" TEXT NOT NULL,
    "obs" TEXT NOT NULL,

    CONSTRAINT "monitorias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "professors_token_key" ON "professors"("token");

-- CreateIndex
CREATE UNIQUE INDEX "monitors_tokenProfessor_key" ON "monitors"("tokenProfessor");

-- CreateIndex
CREATE UNIQUE INDEX "monitorias_idMonitor_key" ON "monitorias"("idMonitor");

-- AddForeignKey
ALTER TABLE "professors" ADD CONSTRAINT "professors_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitors" ADD CONSTRAINT "monitors_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monitorias" ADD CONSTRAINT "monitorias_idMonitor_fkey" FOREIGN KEY ("idMonitor") REFERENCES "monitors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
