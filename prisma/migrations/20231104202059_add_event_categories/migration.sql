-- CreateTable
CREATE TABLE "EventCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "EventCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventToEventCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToEventCategory_AB_unique" ON "_EventToEventCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToEventCategory_B_index" ON "_EventToEventCategory"("B");

-- AddForeignKey
ALTER TABLE "_EventToEventCategory" ADD CONSTRAINT "_EventToEventCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventCategory" ADD CONSTRAINT "_EventToEventCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "EventCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
