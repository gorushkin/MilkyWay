import { repository } from './Models';
import _ from 'lodash';
import { WholeWord } from './types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { User, WordsOnUsers } from '@prisma/client';

dayjs.extend(utc);

export const addUser = (id: number, first_name: string | undefined, username: string | undefined) =>
  repository.PrismaUser.addUser(id, first_name, username);

export const getUser = (telegramId: number) => repository.PrismaUser.getUser(telegramId);

export const addWord = async (value: string, telegramId: number): Promise<WholeWord> => {
  const user = await repository.PrismaUser.getUser(telegramId);

  if (!user?.language) throw new Error('You should set language!!!!');

  return repository.PrismaWord.addWord(value.trim().toLowerCase(), user.language, telegramId);
};

export const getUserWords = async (
  telegramId: number
): Promise<{
  word:
    | (WordsOnUsers & {
        word: WholeWord;
      })
    | undefined;
  mode: string | undefined;
}> => {
  const userWithWords = await repository.PrismaUser.getUserWords(telegramId);
  const word = _.sample(userWithWords?.wordsOnUsers);
  return { word, mode: userWithWords?.mode };
};

export const getWord = async (word: string) => {
  return repository.PrismaWord.getWord(word);
};

export const getJobs = async (): Promise<User[]> => {
  const users = await repository.PrismaUser.getUsersForScheduler();

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
}): Promise<User> => {
  return repository.PrismaUser.updateUser({ telegramId, mode, period, lastSendTime, language });
};

export const updateWordFrequency = async (
  userId: number,
  word: string,
  value: string
): Promise<User & { wordsOnUsers: WordsOnUsers[] }> => {
  return repository.PrismaUser.updateFrequency(userId, word, Number(value));
};
