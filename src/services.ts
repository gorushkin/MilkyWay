import { repository } from './Models';
import _ from 'lodash';
import { WordWithTr } from './types';

const addUser = (id: number, first_name: string | undefined, username: string | undefined) => {
  return repository.User.addUser(id, first_name, username);
};

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

const getJobs = async () => {
  const users = await repository.User.getUsers();
  const currentTime = new Date();
  const jobList = users.filter(async (user) => {
    if (!user.lastSendTime) {
      await repository.User.updateUserSendTime(user.telegramId);
      return true;
    }
    return user.lastSendTime <= currentTime;
  });
  console.log(jobList);
};

const updateUser = (telegramId: number, mode?: string, period?: number): Promise<void> =>
  repository.User.updateUser(telegramId, mode, period);

export const services = { addUser, addWord, getJobs, getUserWords, updateUser };
