import axios, { AxiosError } from 'axios';
import { IDictionaryData } from './helpers';

const LINKS = (word: string) => ({
  CAMBRIDGE: {
    RU: `https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/${word}`,
    EN: `https://dictionary.cambridge.org/dictionary/english/${word}`,
  },
  DICTIONARY: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
});

const MESSAGES = {
  NOT_FOUND_TEXT: 'No Definitions Found',
  SERVER_ERROR: 'There is an error on the server. Try a bit later please',
  ERROR: 'Something is broken. Please say someone about it',
};

class BotError extends Error {
  skippable: boolean;

  constructor(message: string) {
    super(message);
    this.name = 'BotError';
    this.skippable = false;
  }
}

class BotRequestError extends BotError {
  constructor(message: string) {
    super(message);
    this.name = 'BotRequestError';
    this.skippable = true;
  }
}

type Request = (
  word: string
) => Promise<{ data: IDictionaryData[]; error: null } | { error: string; data: null }>;

export const getWordRequest: Request = async (word) => {
  try {
    const { data } = await axios(LINKS(word).DICTIONARY);
    console.log('data: ', typeof data);
    return { data, error: null };
  } catch (error) {
    let message = MESSAGES.ERROR;
    if (error instanceof AxiosError && error.response?.status) {
      if (error.response?.status >= 400 && error.response?.status < 500) {
        message = error.response?.data.title || MESSAGES.NOT_FOUND_TEXT;
      }
      if (error.response?.status >= 500) {
        message = error.response?.data.title || MESSAGES.SERVER_ERROR;
      }
    }
    return { error: message, data: null };
  }
};
