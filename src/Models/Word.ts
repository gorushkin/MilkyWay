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

  async addWord(word: string) {
    // if (await this.isWordExist(word)) return;
    const { data } = await this.getWordFromDictionary(word);
    if (!data) return;

    const { def } = data;

    def.forEach((item) => {
      const translations = item.tr;
      translations.forEach((translation) => {
        const examples = translation.ex;
        if (examples) {
          examples.forEach((example) => {
            console.log(example.text);
            console.log(example.tr[0].text);
          });
        }
      });
    });
  }
}

export default new Word(prisma);
