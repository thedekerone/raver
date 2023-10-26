-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_organiserId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "organiserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organiserId_fkey" FOREIGN KEY ("organiserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
