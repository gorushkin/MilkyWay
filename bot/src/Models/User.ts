import { PrismaClient, Prisma, User as UserType } from '../../../db/generated/client';
import { MODE } from '../constants';
import { BotError, UserWithWholeWord } from '../types';
const prisma = new PrismaClient();

class PrismaUser {
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

    if (!user) throw new BotError('You have to register!!! Choose /start, please');

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

  async getUsersForScheduler() {
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
  async addUser(
    telegramId: number,
    first_name: string | undefined,
    username: string | undefined
  ): Promise<UserType> {
    return this.user.upsert({
      where: {
        telegramId,
      },
      update: {},
      create: {
        telegramId,
        username,
        first_name,
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

export default new PrismaUser(prisma);
