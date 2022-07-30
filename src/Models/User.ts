import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

class User {
  private user: Prisma.UserDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor(client: PrismaClient) {
    this.user = client.user;
  }

  async isUserExist(telegramId: number) {
    const user = await prisma.user.findUnique({ where: { telegramId } });
    return !!user;
  }

  async addWord(telegramId: number, wordId: string) {
    await this.user.update({
      where: { telegramId },
      data: { words: { connect: { id: wordId } } },
    });
  }

  getUsers() {
    return this.user.findMany();
  }

  // TODO: add error handler
  async addUser(telegramId: number, first_name: string | undefined, username: string | undefined) {
    if (await this.isUserExist(telegramId)) return;
    await this.user.create({ data: { telegramId, username, first_name } });
  }
}

export default new User(prisma);
