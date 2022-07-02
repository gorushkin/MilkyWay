/*
  Warnings:

  - Added the required column `word` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Word" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "word" TEXT NOT NULL,
    "meanings" TEXT NOT NULL
);
INSERT INTO "new_Word" ("id", "meanings") SELECT "id", "meanings" FROM "Word";
DROP TABLE "Word";
ALTER TABLE "new_Word" RENAME TO "Word";
CREATE UNIQUE INDEX "Word_word_key" ON "Word"("word");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
