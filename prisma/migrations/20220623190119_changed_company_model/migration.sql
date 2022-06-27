/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Company_authorId_key" ON "Company"("authorId");
