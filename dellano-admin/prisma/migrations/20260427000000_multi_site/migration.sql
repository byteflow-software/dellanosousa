-- CreateEnum
CREATE TYPE "SiteKey" AS ENUM ('PRINCIPAL', 'MARCA', 'PERITO', 'PROVA_DIGITAL', 'CRIMINAL', 'CRIMINAL_CE');

-- AlterTable
ALTER TABLE "Artigo" ADD COLUMN "sites" "SiteKey"[] DEFAULT ARRAY['PRINCIPAL', 'MARCA', 'PERITO', 'PROVA_DIGITAL', 'CRIMINAL', 'CRIMINAL_CE']::"SiteKey"[];

ALTER TABLE "Publicacao" ADD COLUMN "sites" "SiteKey"[] DEFAULT ARRAY['PRINCIPAL', 'MARCA', 'PERITO', 'PROVA_DIGITAL', 'CRIMINAL', 'CRIMINAL_CE']::"SiteKey"[];

ALTER TABLE "Imprensa" ADD COLUMN "sites" "SiteKey"[] DEFAULT ARRAY['PRINCIPAL', 'MARCA', 'PERITO', 'PROVA_DIGITAL', 'CRIMINAL', 'CRIMINAL_CE']::"SiteKey"[];

ALTER TABLE "Evento" ADD COLUMN "sites" "SiteKey"[] DEFAULT ARRAY['PRINCIPAL', 'MARCA', 'PERITO', 'PROVA_DIGITAL', 'CRIMINAL', 'CRIMINAL_CE']::"SiteKey"[];

ALTER TABLE "MembroEquipe" ADD COLUMN "sites" "SiteKey"[] DEFAULT ARRAY['PRINCIPAL', 'MARCA', 'PERITO', 'PROVA_DIGITAL', 'CRIMINAL', 'CRIMINAL_CE']::"SiteKey"[];

ALTER TABLE "FaqItem" ADD COLUMN "sites" "SiteKey"[] DEFAULT ARRAY['PRINCIPAL', 'MARCA', 'PERITO', 'PROVA_DIGITAL', 'CRIMINAL', 'CRIMINAL_CE']::"SiteKey"[];

-- SobrePage: adicionar siteKey, popular registros existentes como PRINCIPAL
ALTER TABLE "SobrePage" ADD COLUMN "siteKey" "SiteKey" NOT NULL DEFAULT 'PRINCIPAL';
CREATE UNIQUE INDEX "SobrePage_siteKey_key" ON "SobrePage"("siteKey");

-- PageSeo: adicionar siteKey, trocar unicidade de pageKey para (siteKey, pageKey)
ALTER TABLE "PageSeo" ADD COLUMN "siteKey" "SiteKey" NOT NULL DEFAULT 'PRINCIPAL';
DROP INDEX IF EXISTS "PageSeo_pageKey_key";
CREATE UNIQUE INDEX "PageSeo_siteKey_pageKey_key" ON "PageSeo"("siteKey", "pageKey");
CREATE INDEX "PageSeo_siteKey_idx" ON "PageSeo"("siteKey");

-- Backfill: garantir que todos os registros existentes tenham os 6 sites
UPDATE "Artigo"       SET "sites" = ARRAY['PRINCIPAL', 'MARCA', 'PERITO', 'PROVA_DIGITAL', 'CRIMINAL', 'CRIMINAL_CE']::"SiteKey"[] WHERE "sites" IS NULL OR cardinality("sites") = 0;
UPDATE "Publicacao"   SET "sites" = ARRAY['PRINCIPAL', 'MARCA', 'PERITO', 'PROVA_DIGITAL', 'CRIMINAL', 'CRIMINAL_CE']::"SiteKey"[] WHERE "sites" IS NULL OR cardinality("sites") = 0;
UPDATE "Imprensa"     SET "sites" = ARRAY['PRINCIPAL', 'MARCA', 'PERITO', 'PROVA_DIGITAL', 'CRIMINAL', 'CRIMINAL_CE']::"SiteKey"[] WHERE "sites" IS NULL OR cardinality("sites") = 0;
UPDATE "Evento"       SET "sites" = ARRAY['PRINCIPAL', 'MARCA', 'PERITO', 'PROVA_DIGITAL', 'CRIMINAL', 'CRIMINAL_CE']::"SiteKey"[] WHERE "sites" IS NULL OR cardinality("sites") = 0;
UPDATE "MembroEquipe" SET "sites" = ARRAY['PRINCIPAL', 'MARCA', 'PERITO', 'PROVA_DIGITAL', 'CRIMINAL', 'CRIMINAL_CE']::"SiteKey"[] WHERE "sites" IS NULL OR cardinality("sites") = 0;
UPDATE "FaqItem"      SET "sites" = ARRAY['PRINCIPAL', 'MARCA', 'PERITO', 'PROVA_DIGITAL', 'CRIMINAL', 'CRIMINAL_CE']::"SiteKey"[] WHERE "sites" IS NULL OR cardinality("sites") = 0;
