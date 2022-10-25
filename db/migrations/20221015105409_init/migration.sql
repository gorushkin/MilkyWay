-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "telegramId" INTEGER NOT NULL,
    "username" TEXT,
    "first_name" TEXT,
    "lastSendTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mode" TEXT NOT NULL DEFAULT E'START',
    "period" INTEGER NOT NULL DEFAULT 15,
    "language" TEXT NOT NULL DEFAULT E'EN',

    CONSTRAINT "User_pkey" PRIMARY KEY ("telegramId")
);

-- CreateTable
CREATE TABLE "Word" (
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("text")
);

-- CreateTable
CREATE TABLE "WordsOnUsers" (
    "userId" INTEGER NOT NULL,
    "wordId" TEXT NOT NULL,
    "frequency" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "WordsOnUsers_pkey" PRIMARY KEY ("userId","wordId")
);

-- CreateTable
CREATE TABLE "Entry" (
    "text" TEXT NOT NULL,
    "part_of_speech" TEXT NOT NULL,
    "transcription" TEXT,
    "wordId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("text","part_of_speech")
);

-- CreateTable
CREATE TABLE "Translation" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "part_of_speech" TEXT NOT NULL,
    "synonym" TEXT,
    "meaning" TEXT,
    "example" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "entryText" TEXT NOT NULL,
    "entryPart_of_speech" TEXT NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "Word_text_key" ON "Word"("text");

-- AddForeignKey
ALTER TABLE "WordsOnUsers" ADD CONSTRAINT "WordsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordsOnUsers" ADD CONSTRAINT "WordsOnUsers_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("text") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("text") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_entryText_entryPart_of_speech_fkey" FOREIGN KEY ("entryText", "entryPart_of_speech") REFERENCES "Entry"("text", "part_of_speech") ON DELETE RESTRICT ON UPDATE CASCADE;
