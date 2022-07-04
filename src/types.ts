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
