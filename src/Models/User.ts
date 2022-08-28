import { PrismaClient, Prisma } from '@prisma/client';
import { MODE, PERIOD } from '../constants';
import { UserWithWholeWord } from '../types';
const prisma = new PrismaClient();

class User {
  private user: Prisma.UserDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor(client: PrismaClient) {
    this.user = client.user;
  }

  async getUser(telegramId: number) {
    return this.user.findUnique({ where: { telegramId } });
  }

  async isUserExist(telegramId: number) {
    const user = await this.user.findUnique({ where: { telegramId } });
    return !!user;
  }

  async getUserWords(telegramId: number): Promise<UserWithWholeWord | null> {
    const user = await this.user.findUnique({
      where: { telegramId },
      select: { language: true },
    });

    if (!user) throw new Error('There is no user at all!!!');

    return this.user.findUnique({
      where: { telegramId },
      include: {
        wordsOnUsers: {
          where: {
            word: {
              language: user.language,
            },
          },
          include: {
            word: {
              include: {
                entry: {
                  include: {
                    translation: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async updateFrequency(telegramId: number, word: string, frequency: number) {
    return this.user.update({
      where: { telegramId },
      data: {
        wordsOnUsers: {
          update: {
            where: {
              userId_wordId: {
                userId: telegramId,
                wordId: word,
              },
            },
            data: {
              frequency,
            },
          },
        },
      },
      include: {
        wordsOnUsers: {
          where: {
            wordId: word,
          },
        },
      },
    });
  }

  getUsers() {
    return this.user.findMany({
      where: {
        wordsOnUsers: {
          some: {
            wordId: { not: '' },
          },
        },
        language: { not: '' },
        mode: {
          equals: MODE.START,
        },
      },
    });
  }

  // TODO: add error handler
  // TODO: UPSERT
  async addUser(telegramId: number, first_name: string | undefined, username: string | undefined) {
    if (await this.isUserExist(telegramId)) return;
    await this.user.create({
      data: {
        telegramId,
        username,
        first_name,
        mode: MODE.START,
        period: Number(PERIOD['15_MIN']),
      },
    });
  }

  async updateUser({
    telegramId,
    mode,
    period,
    lastSendTime,
    language,
  }: {
    telegramId: number;
    mode?: string;
    period?: number;
    lastSendTime?: boolean;
    language?: string;
  }) {
    const data = {
      ...(mode && { mode }),
      ...(period && { period }),
      ...(language && { language }),
      ...(lastSendTime && { lastSendTime: new Date() }),
    };
    return this.user.update({ where: { telegramId }, data });
  }
}

export default new User(prisma);
