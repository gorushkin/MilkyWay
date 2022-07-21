import TelegramBot from 'node-telegram-bot-api';
import { commandsList } from './constants';
import { onStart, onCallbackQuery, onMessage } from './controler';
import { errorHandler } from './errorHanlder';

export const botService = (TOKEN: string): TelegramBot => {
  let bot: TelegramBot | null = null;

  if (bot) return bot;

  bot = new TelegramBot(TOKEN, { polling: true });

  bot.setMyCommands(commandsList);

  bot.on('callback_query', (query) =>
    errorHandler(onCallbackQuery(query), query.message?.chat.id.toString())
  );

  bot.onText(/\/start/, (msg) => errorHandler(onStart(msg), msg.chat.id.toString()));

  bot.on('message', (msg) => errorHandler(onMessage(msg), msg.chat.id.toString()));

  return bot;
};
