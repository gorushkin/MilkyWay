import { InlineKeyboardButton } from 'node-telegram-bot-api';

export const getButton = (text: BUTTONS, type: ACTIONS, value?: string) => {
  const callback_data = JSON.stringify({ type, ...(value && { value }) });
  return { text, callback_data };
};

export const commandsList = [
  { command: '/info', description: 'Info about bot' },
  { command: '/start', description: 'Start smth' },
  { command: '/words', description: 'Show all words' },
];

export const getActionValue = (queryData: string) => {
  const data = JSON.parse(queryData);
  const { type, value } = data;
  return { type, value };
};

export enum BUTTONS {
  ADD_WORD = 'Add Word',
  SHOW_WORDS = 'Show Words',
  CANCEL = 'Cancel',
  ADD = 'Add',
  DICTIONARY = 'Dictionary',
  CambridgeRu = 'CambridgeRu',
  CambridgeEn = 'CambridgeEn',
}

export enum ACTIONS {
  ADD_WORD_CONFIRM = 'ADD_WORD_CONFIRM',
  DELETE = 'delete',
  ADD_WORD_REFUSE = 'ADD_WORD_REFUSE',
  LINK = 'LINK',
}

// const keyboards: Record<string, InlineKeyboardButton[][]> = {
//   start: [
//     [
//       { text: BUTTONS.ADD_WORD, callback_data: 'addword' },
//       { text: BUTTONS.SHOW_WORDS, callback_data: 'showwords' },
//     ],
//   ],
//   addWord: [
//     [
//       { text: BUTTONS.ADD, callback_data: 'add' },
//       { text: BUTTONS.CANCEL, callback_data: 'cancel' },
//     ],
//   ],
// };

export interface IPhonetic {
  text: string;
  audio?: string;
  sourceUrl?: string;
}

export interface IDefenition {
  definition: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
}

export interface IMeaning {
  partOfSpeech: string;
  definitions: IDefenition[];
}

export interface IDictionaryData {
  word: string;
  phonetic: string;
  phonetics: IPhonetic[];
  origin: string;
  meanings: IMeaning[];
}

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
