import { PrismaClient, Prisma, } from '@prisma/client';
import { getWordRequest } from '../api';
import Entry from './Entry';
const prisma = new PrismaClient();

class Word {
  private word: Prisma.WordDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor(client: PrismaClient) {
    this.word = client.word;
  }

  private getWordFromDictionary(word: string) {
    return getWordRequest(word);
  }

  getUserWords(telegramId: number, language: string) {
    return this.word.findMany({
      where: { User: { telegramId }, language },
    });
  }

  getWord(id: string) {
    return this.word.findUnique({ where: { id } });
  }

  async addWord(text: string, language: string) {
    const word = await this.word.findUnique({ where: { text } });

    if (word) return word;

    const data = await this.getWordFromDictionary(text);

    const entries = await Promise.all(data.map((item) => Entry.addEntry(item)));

    return this.word.create({
      data: { text, language, entry: { connect: entries.map(({ id }) => ({ id })) } },
    });
  }
}

export default new Word(prisma);
