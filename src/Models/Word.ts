import { PrismaClient, Prisma } from '@prisma/client';
import { getWordRequest } from '../api';
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
    const word = await this.word.findUnique({ where: { word: text } });
    return !!word;
  }

  async addWord(word: string) {
    if (await this.isWordExist(word)) return;
    const result = await this.getWordFromDictionary(word);
    console.log('result: ', result.data?.length);
    // const result = await getWordRequest(word);
    // await this.word.create()
  }
}

export default new Word(prisma);
