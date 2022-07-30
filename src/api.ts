import axios, { AxiosError, AxiosResponse } from 'axios';
import { config } from './config';
import { ERRORS } from './constants';
import { BotDictionaryError, BotRequestError, WordResponse, YandexRequest } from './types';

export const getLinks = (word: string) => ({
  CAMBRIDGE: {
    RU: `https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/${word}`,
    EN: `https://dictionary.cambridge.org/dictionary/english/${word}`,
  },
  DICTIONARY: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
  YANDEX: `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${config.YANDEX_API_KEY}&lang=en-ru&text=${word}`,
});

export const getWordRequest: YandexRequest = async (word) => {
  try {
    const url = encodeURI(getLinks(word).YANDEX);

    const {
      data: { def },
    }: AxiosResponse<WordResponse> = await axios(url);

    if (!def.length) throw new BotDictionaryError(ERRORS.NOT_FOUND_TEXT(word));

    return def;
  } catch (error) {
    if (error instanceof BotDictionaryError) throw error;
    let message = ERRORS.ERROR;
    if (error instanceof AxiosError && error.response?.status) {
      if (error.response?.status >= 400 && error.response?.status < 500) {
        message = error.response?.data.title || ERRORS.NOT_FOUND_TEXT(word);
      }
      if (error.response?.status >= 500) {
        message = error.response?.data.title || ERRORS.SERVER_ERROR;
      }
    }
    throw new BotRequestError(message);
  }
};
