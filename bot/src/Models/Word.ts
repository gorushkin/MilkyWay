import { PrismaClient, Prisma } from '@prisma/client';
import { getWordRequest } from '../api';
import { DICTIONARY } from '../constants';
import { getData } from '../helpers';
import { WholeWord } from '../types';
const prisma = new PrismaClient();

class PrismaWord {
  private word: Prisma.WordDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor(client: PrismaClient) {
    this.word = client.word;
  }

  private getWordFromDictionary(word: string) {
    return getWordRequest(word, DICTIONARY.EN_RU);
  }

  async getWord(text: string) {
    return this.word.findUnique({
      where: { text },
      include: {
        entry: {
          include: { translation: true },
        },
      },
    });
  }

  async addWord(text: string, language: string, userId: number): Promise<WholeWord> {
    const word = await this.word.findUnique({
      where: { text },
      include: { wordsOnUsers: { where: { userId } } },
    });

    if (word) {
      return this.word.update({
        where: { text },
        data: {
          wordsOnUsers: {
            connectOrCreate: {
              where: {
                userId_wordId: {
                  userId,
                  wordId: word.text,
                },
              },
              create: { userId },
            },
          },
        },
        include: {
          entry: {
            include: { translation: true },
          },
        },
      });
    }

    const data = await this.getWordFromDictionary(text);

    return this.word.create({
      data: {
        language,
        text,
        wordsOnUsers: { create: { userId } },
        entry: {
          create: data.map(({ pos: part_of_speech, text, tr, ts: transcription }) => ({
            part_of_speech,
            transcription,
            text,
            translation: {
              create: tr.map((item) => getData(item)),
            },
          })),
        },
      },
      include: {
        entry: {
          include: { translation: true },
        },
      },
    });
  }
}

export default new PrismaWord(prisma);
