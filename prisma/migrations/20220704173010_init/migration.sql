-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "part_of_speech" TEXT NOT NULL,
    "transcription" TEXT NOT NULL,
    "wordId" TEXT,
    CONSTRAINT "Entry_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Translation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "part_of_speech" TEXT NOT NULL,
    "synonym" TEXT,
    "meaning" TEXT,
    "example" TEXT,
    "entryId" TEXT,
    CONSTRAINT "Translation_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Translation_text_key" ON "Translation"("text");
