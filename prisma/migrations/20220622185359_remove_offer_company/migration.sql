/*
  Warnings:

  - You are about to drop the column `offer` on the `Company` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "photoURL" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Company_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("about", "authorId", "category", "city", "createdAt", "email", "id", "name", "phone", "photoURL", "price", "updatedAt", "website") SELECT "about", "authorId", "category", "city", "createdAt", "email", "id", "name", "phone", "photoURL", "price", "updatedAt", "website" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
