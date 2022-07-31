import { PrismaClient, Prisma } from '@prisma/client';
import { getWordRequest } from '../api';
import { ERRORS } from '../constants';
import { BotDictionaryError } from '../types';
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

  private async isWordExist(text: string) {
    const word = await this.word.findUnique({ where: { text } });
    return !!word;
  }

  getUserWords(telegramId: number) {
    return this.word.findMany({ where: { User: { telegramId: telegramId } } });
  }

  getWord(id: string) {
    return this.word.findUnique({ where: { id } });
  }

  async addWord(text: string) {
    const existingWord = await this.word.findUnique({ where: { text } });

    if (existingWord) return existingWord;

    const data = await this.getWordFromDictionary(text);

    const entries = await Promise.all(data.map((item) => Entry.addEntry(item)));

    return this.word.create({
      data: { text, entry: { connect: entries.map(({ id }) => ({ id })) } },
    });
  }
}

export default new Word(prisma);
