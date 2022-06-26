import { getWordRequest } from './api';
import { IDictionaryData, IMeaning, IPhonetic } from './helpers';

const LINKS = (word: string) => ({
  CAMBRIDGE: {
    RU: `https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/${word}`,
    EN: `https://dictionary.cambridge.org/dictionary/english/${word}`,
  },
  DICTIONARY: `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
});

const MINUTE = 60000;

class User {
  private period: number = MINUTE;
  private _lastSendTime: number;
  private _id: number;

  constructor(id: number, private first_name?: string, private username?: string) {
    this._id = id;
    this.first_name = first_name;
    this.username = username;
    this._lastSendTime = Date.now();
  }

  get id(): number {
    return this._id;
  }

  get lastSendTime(): number {
    return this._lastSendTime;
  }

  get isReadyToSend(): boolean {
    return this._lastSendTime + this.period < Date.now();
  }

  updateLastSendTime() {
    this._lastSendTime = Date.now();
  }
}

class Word {
  private _cambridgeRu: string;
  private _cambridgeEn: string;
  private dictionary: string;
  private meanings: IMeaning[][];
  private phonetics: IPhonetic[];
  // private phonetics2: Map<string, IPhonetic>;

  constructor(private word: string, private data: IDictionaryData[]) {
    // console.log('data: ', data);
    this.word = word;
    this._cambridgeRu = LINKS(word).CAMBRIDGE.RU;
    this._cambridgeEn = LINKS(word).CAMBRIDGE.EN;
    this.dictionary = LINKS(word).DICTIONARY;
    this.meanings = data.map((item) => item.meanings);
    this.phonetics = data
      .reduce<IPhonetic[]>((acc, item) => [...acc, ...item.phonetics], [])
      .filter((item) => item.audio);
    // this.phonetics2 = data.map(item => item.phonetics)
    console.log(this.phonetics);
    // console.log('this.phonetics2 : ', this.phonetics2 );
    // console.log('this.phonetics: ', this.phonetics);
  }

  show() {
    return `${this.word}\n[link](${this._cambridgeEn})`;
  }

  getLinks() {
    return [this._cambridgeEn, this._cambridgeRu];
  }

  get cambridgeRu(): string {
    return this._cambridgeRu;
  }

  get cambridgeEn(): string {
    return this._cambridgeEn;
  }

  get audio() {
    // return this.phonetics[0].audio;
    return '';
  }
}

export default class DB {
  private users: Map<string, User>;
  private words: Map<string, Word>;
  private static instance: DB;

  private constructor() {
    this.users = new Map<string, User>();
    this.words = new Map<string, Word>();
  }

  public static getInstance(): DB {
    if (!DB.instance) DB.instance = new DB();
    return DB.instance;
  }

  private getUser(id: number) {
    return this.users.get(id.toString()) || null;
  }

  private geWord(word: string) {
    return this.words.get(word) || null;
  }

  private checkWord(word: string) {
    return getWordRequest(word);
  }

  getUsers() {
    return Array.from(this.users.values());
  }

  addUser({
    id,
    first_name,
    username,
  }: {
    id: number;
    first_name: string | undefined;
    username: string | undefined;
  }) {
    const user = this.getUser(id);
    if (!user) this.users.set(id.toString(), new User(id, first_name, username));
  }

  async addWord(word: string) {
    const dbWord = this.geWord(word);
    if (!dbWord) {
      const result = await this.checkWord(word);
      console.log('result: ', result);
      if (result.data) {
        this.words.set(word, new Word(word, result.data));
      }
      return result;
    }
  }

  getWords() {
    return Array.from(this.words.values());
  }
}
