/*
  Warnings:

  - You are about to drop the column `bgImageUrl` on the `Marketing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "bgImageUrl" TEXT;

-- AlterTable
ALTER TABLE "Marketing" DROP COLUMN "bgImageUrl";
