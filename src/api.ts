import axios, { AxiosError } from 'axios';
import { config } from './config';
import { IDictionaryData } from './helpers';

const LINKS = (word: string) => ({
  CAMBRIDGE: {
    RU: `https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/${word}`,
    EN: `https://dictionary.cambridge.org/dictionary/english/${word}`,
  },
  DICTIONARY: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
  YANDEX: `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${config.YANDEX_API_KEY}&lang=en-ru&text=${word}`,
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

export interface Synonym {
  text: string;
  partOfSpeech: string;
}

export interface Meaning {
  text: string;
}

export interface Example {
  text: string;
  tr: { text: string }[];
}
export interface Translation {
  text: string;
  pos: string;
  syn: Synonym[];
  mean: Meaning[];
  ex: Example[];
}

export interface Entry {
  text: string;
  pos: string;
  ts: string;
  tr: Translation[];
}

// export interface Word {
//   text: string;
// }

export interface IYandexWord {
  text: string;
  pos?: string;
  ts?: string;
  gen?: string;
  fr?: number;
  syn?: IYandexWord[];
  tr?: IYandexWord[];
  ex?: IYandexWord[];
  mean?: IYandexWord[];
}

type YandexRequest = (
  word: string
) => Promise<{ data: { def: Entry[] }; error: null } | { error: string; data: null }>;

export const getWordRequest: YandexRequest = async (word) => {
  try {
    const { data } = await axios(LINKS(word).YANDEX);
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
