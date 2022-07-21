import { repository } from './Models';

const addUser = (id: number, first_name: string | undefined, username: string | undefined) => {
  return repository.User.addUser(id, first_name, username);
};

const addWord = async (value: string, userId: number) => {
  const res = await repository.Word.addWord(value);
  const wordId = res?.id;
  if (wordId) await repository.User.addWord(userId, wordId);
};

export const services = { addUser, addWord };
