-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telegramId" INTEGER NOT NULL,
    "username" TEXT,
    "first_name" TEXT,
    "lastSendTime" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Word" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "Word_text_key" ON "Word"("text");
