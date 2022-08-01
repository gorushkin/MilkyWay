import { repository } from './Models';
import _ from 'lodash';
import { WordWithTr } from './types';
import { MODE } from './constants';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { User } from '@prisma/client';

dayjs.extend(utc);

const addUser = (id: number, first_name: string | undefined, username: string | undefined) => {
  return repository.User.addUser(id, first_name, username);
};

const getUser = async (telegramId: number) => await repository.User.getUser(telegramId);

const addWord = async (value: string, userId: number) => {
  const res = await repository.Word.addWord(value);
  const wordId = res?.id;
  if (wordId) await repository.User.addWord(userId, wordId);
};

const getUserWords = async (telegramId: number): Promise<null | WordWithTr> => {
  const words = await repository.Word.getUserWords(telegramId);
  const word = _.sample(words);

  if (!word) return null;

  const wordID = word.id;

  const entries = await repository.Entry.getEntry(wordID);

  return { text: word.text, entries };
};

const getJobs = async (): Promise<User[]> => {
  const users = await repository.User.getUsers();
  const currentTime = dayjs();

  return users.filter((user) => {
    if (user.mode === MODE.STOP || user.mode === MODE.WAITING || !user.period) return false;
    if (!user.lastSendTime) return true;
    return dayjs(user.lastSendTime).add(Number(user.period), 'minute') <= currentTime;
  });
};

const updateUser = ({
  telegramId,
  mode,
  period,
  lastSendTime,
}: {
  telegramId: number;
  mode?: string;
  period?: number;
  lastSendTime?: boolean;
}): Promise<void> => repository.User.updateUser({ telegramId, mode, period, lastSendTime });

export const services = { addUser, addWord, getJobs, getUserWords, updateUser, getUser };
