import * as dotenv from 'dotenv';
import DB from './db';

import TelegramBot from 'node-telegram-bot-api';

import { onStart, onAddWord } from './services';

dotenv.config();

const { TOKEN } = process.env;

if (!TOKEN) throw new Error('You should set bot token!');

const bot = new TelegramBot(TOKEN, { polling: true });

const db = DB();

console.log('db: ', db);

// bot.setMyCommands([
//   { command: '/info', description: 'Info about bot' },
//   { command: '/start', description: 'Start smth' },
// ]);

bot.onText(/add word/i, (msg) => onAddWord(msg, bot));

bot.onText(/start/, (msg) => onStart(msg, bot));

bot.onText(/cancel/i, (msg) => onStart(msg, bot));

bot.addListener('callback_query', (query) => {
  console.log('query: ', query);
  if (!query.message?.chat.id) throw new Error('ALARM!!!!');

  if (query.data === 'addword') {
    bot.answerCallbackQuery(query.id, { text: 'Input your word' });
  }
});

bot.on('message', (msg, data) => {
  // console.log('msg: ', msg);
  // console.log('data: ', data);
  // console.log(msg);
});
