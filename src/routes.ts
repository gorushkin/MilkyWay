import TelegramBot from 'node-telegram-bot-api';
import { commandsList } from './constants';
import { onStart, onCallbackQuery, onMessage, onTest } from './controllers';
import { errorHandler } from './errorHanlder';

const addRoutes = (bot: TelegramBot) => {
  bot.setMyCommands(commandsList);

  bot.on('callback_query', (query) =>
    errorHandler(onCallbackQuery(query), query.message?.chat.id.toString())
  );

  bot.onText(/\/start/, (msg) => errorHandler(onStart(msg), msg.chat.id.toString()));

  bot.onText(/\/test/, (msg) => errorHandler(onTest(msg), msg.chat.id.toString()));

  bot.on('message', (msg) => errorHandler(onMessage(msg), msg.chat.id.toString()));
};

export { addRoutes };
