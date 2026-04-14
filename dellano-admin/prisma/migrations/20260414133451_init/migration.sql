-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ArtigoCategory" AS ENUM ('PROVAS_DIGITAIS', 'PROCESSO_PENAL', 'INVESTIGACAO_DEFENSIVA', 'CIBERCRIMES', 'ANALISES');

-- CreateEnum
CREATE TYPE "PublicacaoTipo" AS ENUM ('MIDIA', 'PUBLICACAO_ACADEMICA');

-- CreateEnum
CREATE TYPE "EventoTipo" AS ENUM ('PALESTRA', 'CURSO', 'CONGRESSO', 'MESA');

-- CreateEnum
CREATE TYPE "FaqCategory" AS ENUM ('GERAL', 'PROVAS_DIGITAIS', 'INVESTIGACAO', 'HONORARIOS');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artigo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "category" "ArtigoCategory" NOT NULL,
    "coverImage" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "author" TEXT NOT NULL DEFAULT 'Dellano Sousa',
    "seoTitle" TEXT,
    "seoDesc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artigo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publicacao" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "tipo" "PublicacaoTipo" NOT NULL,
    "url" TEXT,
    "date" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publicacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imprensa" (
    "id" TEXT NOT NULL,
    "outlet" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "url" TEXT,
    "description" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Imprensa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tipo" "EventoTipo" NOT NULL,
    "organizer" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "role" TEXT,
    "description" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MembroEquipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "oab" TEXT,
    "linkedin" TEXT,
    "hierarchy" TEXT NOT NULL,
    "expertise" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MembroEquipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqItem" (
    "id" TEXT NOT NULL,
    "category" "FaqCategory" NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FaqItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SobrePage" (
    "id" TEXT NOT NULL,
    "bioText" TEXT NOT NULL,
    "credentials" TEXT[],
    "lectures" TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SobrePage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageSeo" (
    "id" TEXT NOT NULL,
    "pageKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ogTitle" TEXT,
    "ogDesc" TEXT,
    "noIndex" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageSeo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Artigo_slug_key" ON "Artigo"("slug");

-- CreateIndex
CREATE INDEX "Artigo_status_publishedAt_idx" ON "Artigo"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "Artigo_slug_idx" ON "Artigo"("slug");

-- CreateIndex
CREATE INDEX "Publicacao_tipo_status_idx" ON "Publicacao"("tipo", "status");

-- CreateIndex
CREATE INDEX "Imprensa_status_idx" ON "Imprensa"("status");

-- CreateIndex
CREATE INDEX "Evento_tipo_status_idx" ON "Evento"("tipo", "status");

-- CreateIndex
CREATE INDEX "FaqItem_category_active_idx" ON "FaqItem"("category", "active");

-- CreateIndex
CREATE UNIQUE INDEX "PageSeo_pageKey_key" ON "PageSeo"("pageKey");
