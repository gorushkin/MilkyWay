import { PrismaClient, Prisma } from '@prisma/client';
import { IExample, IMeaning, ISynonym, ITranslation } from '../types';
const prisma = new PrismaClient();

class Entry {
  private translation: Prisma.TranslationDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor(client: PrismaClient) {
    this.translation = client.translation;
  }

  // private async isTranslationExist(text: string) {
  //   const word = await this.translation.findUnique({ where: { text } });
  //   return !!word;
  // }

  private getExamples(examples: IExample[]) {
    return examples
      ? examples.map((item) => ({ text: item.text, translation: item.tr[0].text }))
      : null;
  }

  private getSynonyms(synonyms: ISynonym[]) {
    return synonyms ? synonyms.map(({ pos, text }) => ({ text, partOfSpeech: pos })) : null;
  }

  private getMeanings(meanings: IMeaning[]) {
    return meanings ? meanings.map(({ text }) => ({ text })) : null;
  }

  private getData({ ex, mean, pos, syn, text }: ITranslation) {
    const examples = this.getExamples(ex);
    const synonyms = this.getSynonyms(syn);
    const meanings = this.getMeanings(mean);

    return {
      ...(examples && { example: JSON.stringify(examples) }),
      ...(meanings && { meaning: JSON.stringify(meanings) }),
      ...(synonyms && { synonym: JSON.stringify(synonyms) }),
      part_of_speech: pos,
      text,
    };
  }

  async addTranslation({ ex, mean, pos, syn, text }: ITranslation) {
    const translation = await this.translation.findUnique({ where: { text } });

    if (translation) return translation;

    const data = this.getData({ ex, mean, pos, syn, text });

    return this.translation.create({ data });
  }
}

export default new Entry(prisma);
