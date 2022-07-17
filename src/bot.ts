// import onChange from 'on-change';
import { onMessage, onStart, onAddWord } from './services';
import TelegramBot from 'node-telegram-bot-api';
import { Screens } from './types';

export const state = {
  screen: Screens.start,
};

export const botService = async (TOKEN: string) => {
  const bot = new TelegramBot(TOKEN, { polling: true });

  bot.onText(/\/start/, (msg) => onStart(msg, bot));

  bot.onText(/add word/, (msg) => onAddWord(msg, bot));

  bot.on('message', (msg) => onMessage(msg, bot));
};

// const watchedState = onChange(state, (path, value, previousValue) => {
//   console.log('value: ', value);
//   console.log('path: ', path);
// });
