import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

class User {
  private user: Prisma.UserDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  private lastActiveMessage: number | null;

  constructor(client: PrismaClient) {
    this.user = client.user;
    this.lastActiveMessage = null;
  }

  async isUserExist(telegramId: number) {
    const user = await prisma.user.findUnique({ where: { telegramId } });
    console.log('user exist!!!');
    return !!user;
  }

  async addWord(telegramId: number, wordId: string) {
    const user = await this.user.update({
      where: { telegramId },
      data: { words: { connect: { id: wordId } } },
    });
  }

  async updateLastActiveMessageId(id: number) {
    this.lastActiveMessage = id;
  }

  async isMessageBlocked(id: number) {
    return this.lastActiveMessage ? this.lastActiveMessage >= id : false;
  }

  // TODO: add error handler
  async addUser(telegramId: number, first_name: string | undefined, username: string | undefined) {
    try {
      if (await this.isUserExist(telegramId)) return;
      await this.user.create({ data: { telegramId, username, first_name } });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new User(prisma);
