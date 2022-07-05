import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class User {
  db: PrismaClient;

  constructor(client: PrismaClient) {
    this.db = client;
  }

  async isUserExist(telegramId: number) {
    const user = await prisma.user.findUnique({ where: { telegramId } });
    console.log('user exist!!!');
    return !!user;
  }
  // TODO: add error handler
  async addUser(telegramId: number, first_name: string | undefined, username: string | undefined) {
    if (await this.isUserExist(telegramId)) return;
    await this.db.user.create({ data: { telegramId, username, first_name } });
  }
}

export default new User(prisma);
