import TelegramBot, { CallbackQuery, Message } from 'node-telegram-bot-api';
import { Entry, Translation } from '@prisma/client';
import { ACTION } from './constants';

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

export type EntryWithTr = Entry & {
  translation: Translation[];
};
export interface EntireWord {
  text: string;
  entries: EntryWithTr[];
  id: string;
}

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

export type YandexRequest = (word: string) => Promise<IEntry[]>;

export type WordResponse = { def: IEntry[] };

interface ActionMapFunction {
  ({ id, value }: { id: number; value: string; word: { text: string; id: string } }): Promise<void>;
}

export type ActionMap = Record<ACTION, ActionMapFunction>;

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
