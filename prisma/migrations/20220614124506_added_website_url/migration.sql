/*
  Warnings:

  - Added the required column `website` to the `Company` table without a default value. This is not possible if the table is not empty.

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
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "photoURL" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Company_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Company" ("about", "authorId", "category", "city", "createdAt", "email", "id", "name", "offer", "phone", "photoURL", "price", "updatedAt") SELECT "about", "authorId", "category", "city", "createdAt", "email", "id", "name", "offer", "phone", "photoURL", "price", "updatedAt" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
