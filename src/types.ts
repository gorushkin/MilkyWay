import TelegramBot, { CallbackQuery, Message } from 'node-telegram-bot-api';
import { Entry, Translation, User, Word, WordsOnUsers } from '@prisma/client';
import { ACTION, DICTIONARY, SCREEN } from './constants';

export interface IPhonetic {
  text: string;
  audio?: string;
  sourceUrl?: string;
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

export type WholeWord = Word & {
  entry: (Entry & {
    translation: Translation[];
  })[];
};

export type UserWithWholeWord = User & {
  wordsOnUsers: (WordsOnUsers & {
    word: WholeWord;
  })[];
};

export interface ParsedEntries {
  part_of_speech: string;
  translations: {
    text: string;
    example?: string;
    meaning?: string;
  }[];
}

export interface HandleError {
  (bot: TelegramBot, id: number, message: string): Promise<void>;
}

export interface CallBackHandler {
  (query: CallbackQuery): Promise<void | never>;
}

export interface CommandHandler {
  (query: Message): Promise<void | never | Message>;
}

export interface MessageHandler {
  (query: Message): Promise<void | never | undefined>;
}

export type YandexRequest = (word: string, dictionary: DICTIONARY) => Promise<IEntry[]>;

export type WordResponse = { def: IEntry[] };

interface ActionMapFunction {
  ({
    value,
    telegramId,
    hiddenValue,
    button,
    screen,
    user,
  }: {
    telegramId: number;
    value: string;
    hiddenValue: string;
    button: string;
    screen: string;
    user: User;
  }): Promise<ScreenMapFunctionResult>;
}

export type ActionMap = Record<ACTION, ActionMapFunction>;

interface ScreenMapFunctionResultWithKeyboard {
  message: string;
  options: {
    parse_mode: TelegramBot.ParseMode;
    reply_markup: TelegramBot.InlineKeyboardMarkup;
  };
}

interface ScreenMapFunctionResultWithoutKeyboard {
  message: string;
  options: {
    parse_mode: TelegramBot.ParseMode;
  };
}

type ScreenMapFunctionResult =
  | ScreenMapFunctionResultWithKeyboard
  | ScreenMapFunctionResultWithoutKeyboard;

interface ScreenMapFunction {
  ({
    id,
    value,
    user,
    keyboard,
  }: {
    id?: number;
    value: string;
    keyboard:
      | TelegramBot.InlineKeyboardMarkup
      | null
      | ((mode: string) => TelegramBot.InlineKeyboardMarkup);
    user: User;
  }): ScreenMapFunctionResult;
}

export type ScreenMap = Record<SCREEN, ScreenMapFunction>;

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

export class DBError extends BotError {
  constructor(message: string) {
    super(message);
    this.name = 'Database error';
    this.skippable = true;
  }
}
