import { repository } from './Models';
import _ from 'lodash';
import { EntryWithTr, EntireWord } from './types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { User } from '@prisma/client';

dayjs.extend(utc);

export const getWordWithEntries = (wordID: string): Promise<EntryWithTr[]> =>
  repository.Entry.getEntry(wordID);

export const addUser = (id: number, first_name: string | undefined, username: string | undefined) =>
  repository.User.addUser(id, first_name, username);

export const getUser = (telegramId: number) => repository.User.getUser(telegramId);

export const addWord = async (value: string, userId: number): Promise<EntireWord> => {
  const user = await repository.User.getUser(userId);

  if (!user?.language) throw new Error('You should set language!!!!');

  const word = await repository.Word.addWord(value, user.language);

  const wordId = word?.id;
  if (wordId) await repository.User.addWord(userId, wordId);

  const entries = await getWordWithEntries(word.id);
  return { text: word.text, entries };
};

export const getUserWords = async (telegramId: number): Promise<null | EntireWord> => {
  const user = await repository.User.getUser(telegramId);

  if (!user?.language) return null;

  const words = await repository.Word.getUserWords(telegramId, user.language);
  const word = _.sample(words);

  if (!word) return null;

  const wordID = word.id;

  const entries = await getWordWithEntries(wordID);

  return { text: word.text, entries };
};

export const getJobs = async (): Promise<User[]> => {
  const users = await repository.User.getUsers();

  return users.filter(
    (user) => dayjs(user.lastSendTime).add(Number(user.period), 'minute') <= dayjs()
  );
};

export const updateUser = ({
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
}): Promise<void> =>
  repository.User.updateUser({ telegramId, mode, period, lastSendTime, language });
