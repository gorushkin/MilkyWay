import _ from 'lodash';

class User {
  constructor(private id: number) {
    this.id = id;
  }
}

class Word {
  private userId: User;
  private id: string;
  private word: string;

  constructor(word: string, id: number) {
    this.userId = new User(id);
    this.id = _.uniqueId('r');
    this.word = word;
  }
}

class DB {
  private users: Map<string, User>
  private records: Word[];

  constructor() {
    this.users = new Map<string, User>();
    this.records = [];
  }

  addUser(id: number) {
    console.log(id);
    // this.users = [...this.users, new User(id)];
  }

  addRecord(word: string, id: number) {
    this.records = [...this.records, new Word(word, id)];
  }
}

export default () => {
  let instance: DB | null = null;

  if (instance !== null) return instance;

  instance = new DB();
  return instance;
};
