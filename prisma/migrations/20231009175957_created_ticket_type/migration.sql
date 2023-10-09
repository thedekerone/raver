/*
  Warnings:

  - You are about to drop the column `eventId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticketBgColor` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticketBorderColor` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticketSubTextColor` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticketTextColor` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `ticketTypeId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_eventId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "eventId",
DROP COLUMN "price",
DROP COLUMN "quantity",
DROP COLUMN "ticketBgColor",
DROP COLUMN "ticketBorderColor",
DROP COLUMN "ticketSubTextColor",
DROP COLUMN "ticketTextColor",
ADD COLUMN     "ticketTypeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TicketType" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "name" TEXT,
    "description" TEXT,

    CONSTRAINT "TicketType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TicketType" ADD CONSTRAINT "TicketType_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES "TicketType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
