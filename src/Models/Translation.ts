import { PrismaClient, Prisma } from '@prisma/client';
import { getWordRequest, IYandexWord } from '../api';
const prisma = new PrismaClient();

class Entry {
  private translation: Prisma.TranslationDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor(client: PrismaClient) {
    this.translation = client.translation;
  }

  // private getWordFromDictionary(word: string) {
  //   return getWordRequest(word);
  // }

  // private async isEntryExist(text: string) {
  //   const word = await this.entry.findUnique({ where: { text } });
  //   return !!word;
  // }

  async addTranslation(translation: IYandexWord) {
    console.log('entry: ', entry);
    // if (await this.isWordExist(word)) return;
  }
}

export default new Entry(prisma);
