import TelegramBot, { Message } from 'node-telegram-bot-api';

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

export interface ISynonym {
  text: string;
  pos: string;
}

export interface IMeaning {
  text: string;
}

export interface IExample {
  text: string;
  tr: { text: string }[];
}
export interface ITranslation {
  text: string;
  pos: string;
  syn: ISynonym[];
  mean: IMeaning[];
  ex: IExample[];
}

export interface IEntry {
  text: string;
  pos: string;
  ts: string;
  tr: ITranslation[];
}

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

export interface Action {
  (bot: TelegramBot, id: number, value: string): Promise<void>;
}

export interface HandleError {
  (bot: TelegramBot, id: number, message: string): Promise<void>;
}

export type TelegramService = (msg: Message, bot: TelegramBot) => void;

export type CallbackQueryMap = Record<string, Action>;

export type YandexRequest = (word: string) => Promise<{ def: IEntry[] } | never>;

export class BotError extends Error {
  skippable: boolean;

  constructor(message: string) {
    super(message);
    this.name = 'BotError';
    this.skippable = false;
  }
}

export class BotRequestError extends BotError {
  constructor(message: string) {
    super(message);
    this.name = 'BotRequestError';
    this.skippable = true;
  }
}

export class BotDictionaryError extends BotError {
  constructor(message: string) {
    super(message);
    this.name = 'Dictionary error';
    this.skippable = true;
  }
}

export enum Screens {
  start = 'start',
  error = 'error',
}

enum Buttons {
  addWord = 'add word',
  retry = 'retry',
  cancel = 'cancel',
  test = 'test',
}

interface IButton {
  text: Buttons;
}

interface IScreen {
  buttons: IButton[];
  name: Screens;
}

export const screens: Record<string, IScreen> = {
  start: {
    buttons: [{ text: Buttons.addWord }, { text: Buttons.test }],
    name: Screens.start,
  },
  addWordError: {
    name: Screens.error,
    buttons: [{ text: Buttons.retry }, { text: Buttons.cancel }],
  },
  addWordSuccess: {
    name: Screens.start,
    buttons: [{ text: Buttons.addWord }],
  },
};
