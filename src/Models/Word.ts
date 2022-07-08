import { PrismaClient, Prisma } from '@prisma/client';
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

  private async isWordExist(text: string) {
    const word = await this.word.findUnique({ where: { text } });
    return !!word;
  }

  async addWord(text: string) {
    const existingWord = await this.word.findUnique({ where: { text } });

    if (existingWord) return existingWord;

    const { data, error } = await this.getWordFromDictionary(text);

    if (!data) {
      console.log('we were not able to find this word');
      console.log('error: ', error);
      return;
    }

    const { def } = data;

    const entries = await Promise.all(def.map((item) => Entry.addEntry(item)));

    return this.word.create({
      data: { text, entry: { connect: entries.map(({ id }) => ({ id })) } },
    });
  }
}

export default new Word(prisma);
