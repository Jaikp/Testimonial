/*
  Warnings:

  - The primary key for the `Space` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Space" DROP CONSTRAINT "Space_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Space_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Space_id_seq";
