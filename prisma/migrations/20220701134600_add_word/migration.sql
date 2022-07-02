-- CreateTable
CREATE TABLE "Phonetic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "audio" TEXT,
    "sourceUrl" TEXT,
    "wordId" TEXT,
    CONSTRAINT "Phonetic_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Word" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "meanings" TEXT NOT NULL
);
