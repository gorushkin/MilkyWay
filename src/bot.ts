import { onMessage, onCallbackQuery, onStart, onTest } from './services';
import TelegramBot from 'node-telegram-bot-api';
import { commandsList } from './helpers';

export const botService = async (TOKEN: string) => {
  const bot = new TelegramBot(TOKEN, { polling: true });

  bot.onText(/\/start/, (msg) => onStart(msg, bot));

  bot.onText(/\/test/, async (msg) => onTest(msg, bot));

  bot.setMyCommands(commandsList);

  bot.on('callback_query', (query) => onCallbackQuery(query, bot));

  bot.on('message', (msg) => onMessage(msg, bot));

  // const sendMessage = () => {
  //   setTimeout(() => {
  //     const users = db.getUsers();
  //     users.forEach((user) => {
  //       if (user.isReadyToSend) {
  //         bot.sendMessage(user.id, 'qweqw');
  //         user.updateLastSendTime();
  //       }
  //     });
  //     sendMessage();
  //   }, 2500);
  // };

  // sendMessage();
};
