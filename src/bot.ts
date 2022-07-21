import TelegramBot from 'node-telegram-bot-api';
import { commandsList } from './constants';
import { callBackAction, onStart, onMessage } from './controllers';
import { errorHandler } from './errorHanlder';

export const botService = async (TOKEN: string) => {
  const bot = new TelegramBot(TOKEN, { polling: true });

  bot.setMyCommands(commandsList);

  bot.on('callback_query', (query) => errorHandler(callBackAction(query, bot)));

  bot.onText(/\/start/, (msg) => errorHandler(onStart(msg, bot)));

  bot.on('message', (msg) => errorHandler(onMessage(msg, bot)));
};
