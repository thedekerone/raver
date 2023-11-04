/*
  Warnings:

  - Made the column `organiserId` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_organiserId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "organiserId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "hasMultipleUses" BOOLEAN DEFAULT false,
ADD COLUMN     "isValid" BOOLEAN DEFAULT true,
ADD COLUMN     "uses" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organiserId_fkey" FOREIGN KEY ("organiserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
