-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telegramId" INTEGER NOT NULL,
    "username" TEXT,
    "first_name" TEXT,
    "lastSendTime" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "mode" TEXT,
    "period" INTEGER
);
INSERT INTO "new_User" ("createdAt", "first_name", "id", "lastSendTime", "mode", "period", "telegramId", "updatedAt", "username") SELECT "createdAt", "first_name", "id", "lastSendTime", "mode", "period", "telegramId", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
