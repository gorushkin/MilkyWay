import { PrismaClient, Prisma } from '@prisma/client';
import { IEntry } from '../types';
import Translation from './Translation';
const prisma = new PrismaClient();

class Entry {
  private entry: Prisma.EntryDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;

  constructor(client: PrismaClient) {
    this.entry = client.entry;
  }

  async addEntry({ pos, text, tr, ts }: IEntry) {
    const translations = await Promise.all(
      tr.map((translation) => Translation.addTranslation(translation))
    );

    return this.entry.create({
      data: {
        text,
        part_of_speech: pos,
        transcription: ts,
        translation: { connect: translations.map(({ id }) => ({ id })) },
      },
    });
  }
}

export default new Entry(prisma);
