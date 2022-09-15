import { User } from '@prisma/client';
import TelegramBot from 'node-telegram-bot-api';
import { getLinks } from '../api';
import { ACTION, BUTTON, SCREEN } from '../constants';
import {
  WholeWord,
  ITranslation,
  IExample,
  IMeaning,
  ISynonym,
  ScreenMap,
} from '../types';
import { actionKeyboardMapping } from './keyboards';

export const unpackData = (
  queryData: string
): { button: string; value: string; keyboard: string; screen: string; action: ACTION } => {
  const { b: button, v: value, s: screen, k: keyboard, a: action } = JSON.parse(queryData);
  return { button, value, keyboard, screen, action };
};

export const getFlatArray = <T>(target: Array<T>): Array<T> => {
  const res: Array<T> = [];

  const req = (n: T | Array<T>) => {
    if (!Array.isArray(n)) res.push(n);
    else {
      n.forEach(req);
    }
  };

  req(target);
  return res;
};

export const getFormattedMessageBody = (word: WholeWord) =>
  word.entry
    .map(
      (entry) =>
        `<b>${entry.part_of_speech}:</b> ${entry.translation.map((item) => item.text).join(', ')}`
    )
    .join('\n');

export const getFormattedMessage = (word: WholeWord, url: string) => {
  const messageTitle = `<a href="${url}"><b><u>${word.text.toUpperCase()}</u></b></a>`;

  const messageBody = getFormattedMessageBody(word);

  return `${messageTitle}\n${messageBody}`;
};

export const getFormattedSettingsMessage = (
  title: string,
  props: Record<string, string | number | null>
) => {
  const filteredUserProperties = Object.entries(props).reduce(
    (acc: { key: string | number | null; value: string | number }[], [key, value]) =>
      value ? [...acc, { key, value }] : acc,
    []
  );

  const formattedSettingsBody = filteredUserProperties
    .filter((item) => !!item.value)
    .map(({ key, value }) => `<b>${key}:</b> ${value}`)
    .join('\n');

  const formattedSettingsTitle = `<b>${title}</b>`;

  return `${formattedSettingsTitle}\n${formattedSettingsBody}`;
};

export const getValueFromMessageBody = (entity: TelegramBot.MessageEntity | undefined): string => {
  if (!entity || entity.type !== 'text_link' || !entity.url) return '';
  const string = entity.url.slice(9);
  return Buffer.from(string, 'base64').toString();
};

export const getHiddenMessage = (word: string) => {
  const encodeMessage = Buffer.from(word).toString('base64');
  return `<a href="tg://btn/${encodeMessage}">\u200b</a>`;
};

export const getMessage = (word: WholeWord, extra?: string) => {
  const url = getLinks(word.text).CAMBRIDGE.RU;
  const formattedMessage = getFormattedMessage(word, url);
  const hiddenMessage = getHiddenMessage(word.text);
  return extra ? hiddenMessage + extra + formattedMessage : hiddenMessage + formattedMessage;
};

export const getData = ({ ex, mean, pos, syn, text }: ITranslation) => {
  const getExamples = (examples: IExample[]) => {
    return examples
      ? examples.map((item) => ({ text: item.text, translation: item.tr[0].text }))
      : null;
  };

  const getSynonyms = (synonyms: ISynonym[]) => {
    return synonyms ? synonyms.map(({ pos, text }) => ({ text, partOfSpeech: pos })) : null;
  };

  const getMeanings = (meanings: IMeaning[]) => {
    return meanings ? meanings.map(({ text }) => ({ text })) : null;
  };

  const examples = getExamples(ex);
  const synonyms = getSynonyms(syn);
  const meanings = getMeanings(mean);

  return {
    ...(examples && { example: JSON.stringify(examples) }),
    ...(meanings && { meaning: JSON.stringify(meanings) }),
    ...(synonyms && { synonym: JSON.stringify(synonyms) }),
    part_of_speech: pos,
    text,
  };
};

const screenMessageMapping: ScreenMap = {
  [SCREEN.START]: ({ user, keyboard }) => {
    const message = `Hello, ${user.username}`;

    return {
      message,
      options: {
        parse_mode: 'HTML',
        reply_markup: keyboard,
      },
    };
  },
  [SCREEN.SETTINGS]: ({ user, keyboard }) => {
    const { mode, period, language } = user;
    const message = getFormattedSettingsMessage('Current Settings', { mode, period, language });

    return {
      message,
      options: {
        parse_mode: 'HTML',
        reply_markup: keyboard,
      },
    };
  },
  [SCREEN.APPLY_SETTINGS]: ({ user, keyboard }) => {
    const { mode, period, language } = user;
    const message = getFormattedSettingsMessage('I changed something in your settings', {
      mode,
      period,
      language,
    });

    return {
      message,
      options: {
        parse_mode: 'HTML',
        reply_markup: keyboard,
      },
    };
  },
  [SCREEN.ADD_WORD]: ({ keyboard }) => {
    const message = 'Add word to your list?';

    return {
      message,
      options: {
        parse_mode: 'HTML',
        reply_markup: keyboard,
      },
    };
  },
  [SCREEN.ADD_WORD_CONFIRM]: ({ value }) => {
    return {
      message: value,
      options: {
        parse_mode: 'HTML',
      },
    };
  },
  [SCREEN.ADD_WORD_REFUSE]: () => {
    const message = 'Ok';

    return {
      message,
      options: {
        parse_mode: 'HTML',
      },
    };
  },
  [SCREEN.WORD_SHOW]: ({ keyboard, value, user }) => {
    if (typeof keyboard !== 'function') {
      return {
        message: value,
        options: {
          parse_mode: 'HTML',
          reply_markup: keyboard,
        },
      };
    }

    return {
      message: value,
      options: {
        parse_mode: 'HTML',
        reply_markup: keyboard(user.mode),
      },
    };
  },
};

export const getMessageData = (button: string, value: string, screen: string, user: User) => {
  const keyboard = actionKeyboardMapping[button as BUTTON];

  return screenMessageMapping[screen as SCREEN]({ keyboard, user, value });
};
